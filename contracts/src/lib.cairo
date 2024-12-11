use creator::{Token, Basket};

#[starknet::interface]
pub trait Creator<TContractState> {
    fn create_basket(ref self: TContractState, basket: Span<Token>) -> BasketIdKey;
    fn get_basket(self: @TContractState, basket_id_key: BasketIdKey) -> Basket;
    fn get_basket_info(self: @TContractState, basket_id: BasketIdKey) -> BasketInfo;
    fn deposit(ref self: TContractState, basket_id: BasketIdKey, amount: Amount, quantity: u128);
    // fn partial withdraw
    fn withdraw(ref self: TContractState, basket_id: BasketIdKey);
    // fn switch
// fn view_performance(self: @TContractState) -> Performance;
// fn sell(ref self: TContractState, basket_id: BasketId) -> ?;
}

// types

#[derive(Debug, Drop, Hash, Serde, starknet::Store, Clone, Copy)]
pub struct BasketInfo {
    pub performance: Performance,
    pub liquidity: Amount,
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


// events:
// deposit
// withdraw
// switch
// sell

#[starknet::contract]
pub mod creator {
    use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
    use starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess, StoragePathEntry, Map,
        StorageMapReadAccess,
    };
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
        user_info: Map<ContractAddress, Map<BasketId, Amount>>,
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

        fn deposit(ref self: ContractState, basket_id: BasketIdKey, amount: Amount, quantity: u128) {
            // increase basket info liquidity
            let mut basket_info = self.basket_info.entry(basket_id).read();
            basket_info.liquidity += quantity;
            self.basket_info.entry(basket_id).write(basket_info);

            // transfer from user to contract
            self
                .token_dispatcher
                .read()
                .transfer_from(
                    sender: get_caller_address(),
                    recipient: get_contract_address(),
                    :amount,
                );

            // TODO:
            let basket = self.get_basket(basket_id_key: basket_id.get(0));                
            // increase user token balance
            let user = get_caller_address();
            let assets = self.user_info.entry(user).entry(basket_id).read();
            self.user_info.entry(user).entry(basket_id).write(assets + quantity);
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

            // Calculate amount of one asset
            let price_per_asset = 1;

            // transfer from user to contract
            self
                .token_dispatcher
                .read()
                .transfer(recipient: get_caller_address(), amount: price_per_asset);

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
        // fn partial_withdraw(ref self: ContractState, basket_id: BasketId, amount: Amount) {
    //     // decrease basket info liquidity
    //     let mut basket_info = self.basket_info.read(basket_id);
    //     basket_info.liquidity -= amount;
    //     self.basket_info.write(basket_id, basket_info);

        //     // decrease user token balance

        // }

        // fn sell(ref self: ContractState, basket_id: BasketId) {
    //     // decrease basket info liquidity
    //     let mut basket_info = self.basket_info.read(basket_id);
    //     basket_info.liquidity -= amount;
    //     self.basket_info.write(basket_id, basket_info);

        //     // decrease user token balance

        // }

        // fn switch(ref self: ContractState, from: BasketId ,to: BasketId) {
    //     // decrease basket info liquidity
    //     let mut basket_info = self.basket_info.read(from);
    //     basket_info.liquidity -= amount;
    //     self.basket_info.write(from, basket_info);

        //     // decrease user token balance

        //     // increase baskt info liquidity
    //     let mut basket_info = self.basket_info.read(to);
    //     basket_info.liquidity += amount;
    //     self.basket_info.write(to, basket_info);

        //     // increase user token balance

        // }
    }
}
