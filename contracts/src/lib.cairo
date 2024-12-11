use creator::{Token, Basket};
use starknet::ContractAddress;

#[starknet::interface]
trait IJediSwapV2SwapRouter<TContractState> {
    fn exact_output_single(ref self: TContractState, params: ExactOutputSingleParams) -> u256;
    fn exact_input_single(ref self: TContractState, params: ExactInputSingleParams) -> u256;
}

#[derive(Copy, Drop, Serde, Debug)]
struct ExactOutputSingleParams {
    token_in: ContractAddress,
    token_out: ContractAddress,
    fee: u32,
    recipient: ContractAddress,
    deadline: u64,
    amount_out: u256,
    amount_in_maximum: u256,
    sqrt_price_limit_X96: u256,
}
#[derive(Copy, Drop, Serde)]
struct ExactInputSingleParams {
    token_in: ContractAddress,
    token_out: ContractAddress,
    fee: u32,
    recipient: ContractAddress,
    deadline: u64,
    amount_in: u256,
    amount_out_minimum: u256,
    sqrt_price_limit_X96: u256,
}
#[starknet::interface]
pub trait Creator<TContractState> {
    fn create_basket(ref self: TContractState, basket: Span<Token>) -> BasketIdKey;
    fn get_basket(self: @TContractState, basket_id_key: BasketIdKey) -> Basket;
    fn get_basket_info(self: @TContractState, basket_id: BasketIdKey) -> BasketInfo;
    fn deposit(ref self: TContractState, basket_id: BasketIdKey, amount: Amount, quantity: u128);
    fn withdraw(ref self: TContractState, basket_id: BasketIdKey);
}

// types

#[derive(Debug, Drop, Hash, Serde, starknet::Store, Clone, Copy)]
pub struct BasketInfo {
    pub performance: Performance,
    pub liquidity: u128,
    pub length: BasketLen,
}

#[derive(Debug, Drop, Hash, Serde, starknet::Store, Clone, Copy)]
pub type BasketId = (
    BasketIdKey, BasketLen,
);
pub type BasketLen = u32;
pub type BasketIdKey = u128;
pub type Amount = u256;
pub type Performance = u16;


#[starknet::contract]
pub mod creator {
    use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
    use starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess, StoragePathEntry, Map,
        StorageMapReadAccess,
    };
    use super::{IJediSwapV2SwapRouterDispatcher, IJediSwapV2SwapRouterDispatcherTrait};
    use starknet::{
        ContractAddress, contract_address_const, get_caller_address, get_contract_address,
    };
    use super::{BasketInfo, BasketId, BasketIdKey, Amount, BasketLen};

    #[derive(Debug, Serde, Drop, PartialEq)]
    pub struct Basket {
        pub value: Span<Token>,
    }

    pub impl DefaultToken of Default<Token> {
        fn default() -> Token {
            Token { token: contract_address_const::<0x0>(), amount: 0 }
        }
    }
    pub impl DefaultBasket of Default<Basket> {
        fn default() -> Basket {
            Basket { value: array![].span() }
        }
    }


    #[derive(Debug, Drop, Hash, Serde, starknet::Store, Clone, Copy, PartialEq)]
    pub struct Token {
        pub token: ContractAddress,
        pub amount: u256,
    }


    #[constructor]
    fn constructor(ref self: ContractState, token_address: ContractAddress) {
        self.token_dispatcher.write(IERC20Dispatcher { contract_address: token_address });
    }

    #[storage]
    pub struct Storage {
        baskets: Map<BasketId, Token>,
        basket_len: Map<BasketIdKey, BasketLen>,
        total_baskets: u128,
        basket_info: Map<BasketIdKey, BasketInfo>,
        user_info: Map<ContractAddress, Map<BasketIdKey, Amount>>,
        token_dispatcher: IERC20Dispatcher,
    }

    #[abi(embed_v0)]
    impl CreatorImpl of super::Creator<ContractState> {
        fn create_basket(ref self: ContractState, basket: Span<Token>) -> BasketIdKey {
            let basket_id = self.total_baskets.read();
            let mut i = 0;
            for token in basket {
                self.baskets.entry((basket_id, i)).write(*token);
                i += 1;
            };

            self.total_baskets.write(basket_id + 1);
            self.basket_len.entry(basket_id).write(i);
            basket_id
        }

        fn deposit(
            ref self: ContractState, basket_id: BasketIdKey, amount: Amount, quantity: u128,
        ) {
            // increase basket info liquidity
            let mut basket_info = self.basket_info.entry(basket_id).read();
            let erc20 = self.token_dispatcher.read();
            basket_info.liquidity += quantity;
            self.basket_info.entry(basket_id).write(basket_info);

            // transfer from user to contract
            self
                .token_dispatcher
                .read()
                .transfer_from(
                    sender: get_caller_address(), recipient: get_contract_address(), :amount,
                );

            let basket = self.get_basket(basket_id_key: basket_id);
            let jediswap = IJediSwapV2SwapRouterDispatcher {
                contract_address: contract_address_const::<
                    0x03c8e56d7f6afccb775160f1ae3b69e3db31b443e544e56bd845d8b3b3a87a21,
                >(),
            };
            erc20.approve(jediswap.contract_address, amount);
            for token in basket.value {
                for _ in 0..quantity {
                    jediswap
                        .exact_output_single(
                            super::ExactOutputSingleParams {
                                token_in: self.token_dispatcher.read().contract_address,
                                token_out: *token.token,
                                fee: 3000,
                                recipient: get_contract_address(),
                                deadline: 0xffffffffffffffff,
                                amount_out: *token.amount,
                                amount_in_maximum: amount,
                                sqrt_price_limit_X96: 0,
                            },
                        );
                }
            };
            erc20.approve(jediswap.contract_address, 0);
            erc20.transfer(get_caller_address(), erc20.balance_of(get_contract_address()));

            // increase user token balance
            let user = get_caller_address();
            let assets = self.user_info.entry(user).entry(basket_id).read();
            self.user_info.entry(user).entry(basket_id).write(assets + quantity.into());
        }

        fn withdraw(ref self: ContractState, basket_id: u128) {
            // assert user have something to withdraw
            let user = get_caller_address();
            let amount = self.user_info.entry(user).entry(basket_id).read();
            assert!(amount > 0, "User have nothing to withdraw");
            // decrease basket info liquidity
            let mut basket_info = self.basket_info.entry(basket_id).read();
            basket_info.liquidity -= 1;
            self.basket_info.entry(basket_id).write(basket_info);

            let basket = self.get_basket(basket_id_key: basket_id);
            let jediswap = IJediSwapV2SwapRouterDispatcher {
                contract_address: contract_address_const::<
                    0x03c8e56d7f6afccb775160f1ae3b69e3db31b443e544e56bd845d8b3b3a87a21,
                >(),
            };
            let assets = self.user_info.entry(user).entry(basket_id).read();
            for token in basket.value {
                for _ in 0..assets {
                    IERC20Dispatcher { contract_address: *token.token }
                        .approve(jediswap.contract_address, *token.amount);
                    jediswap
                        .exact_input_single(
                            super::ExactInputSingleParams {
                                token_in: *token.token,
                                token_out: self.token_dispatcher.read().contract_address,
                                fee: 3000,
                                recipient: get_contract_address(),
                                deadline: 0xffffffffffffffff,
                                amount_in: *token.amount,
                                amount_out_minimum: 0,
                                sqrt_price_limit_X96: 0,
                            },
                        );
                }
            };
            let erc20 = self.token_dispatcher.read();
            erc20.approve(jediswap.contract_address, 0);

            erc20.transfer(get_caller_address(), erc20.balance_of(get_contract_address()));
            // decrease user token balance
            let user = get_caller_address();
            let amount = self.user_info.entry(user).entry(basket_id).read();
            self.user_info.entry(user).entry(basket_id).write(amount - 1);
        }


        fn get_basket(self: @ContractState, basket_id_key: BasketIdKey) -> Basket {
            let mut tokens = array![];
            let basket_len = self.basket_len.entry(basket_id_key).read();
            for i in 0..basket_len {
                tokens.append(self.baskets.entry((basket_id_key, i)).read());
            };
            Basket { value: tokens.span() }
        }

        fn get_basket_info(self: @ContractState, basket_id: u128) -> BasketInfo {
            self.basket_info.read(basket_id)
        }
    }
}
