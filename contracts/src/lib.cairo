use creator::{Token, Basket};


#[starknet::interface]
pub trait Creator<TContractState> {
    fn create_basket(ref self: TContractState, basket: Span<Token>) -> u128;
    fn get_basket(self: @TContractState, basket_id: u128) -> Basket;
    // fn get_performance(self: @T, basket_id: u64) -> BasketInfo { performance, liquidity };
}

#[starknet::contract]
pub mod creator {
    use starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess, StoragePathEntry, Map,
    };

    use starknet::{ContractAddress, contract_address_const};
    #[derive(Debug, Serde, Drop)]
    pub struct Basket {
        value: Span<Token>,
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


    #[derive(Debug, Drop, Hash, Serde, starknet::Store, Clone, Copy)]
    pub struct Token {
        pub token: ContractAddress,
        pub amount: u256,
    }

    #[storage]
    pub struct Storage {
        baskets: Map<(u128, u32), Token>,
        basket_len: Map<u128, u32>,
        total_baskets: u128,
    }

    // Map<u128, Map<u8, Token>>
    // Map<u8, Token>
    #[abi(embed_v0)]
    impl CreatorImpl of super::Creator<ContractState> {
        fn create_basket(ref self: ContractState, basket: Span<Token>) -> u128 {
            let basket_id = self.total_baskets.read();
            let mut i = 0;
            for token in basket {
                self.baskets.entry((basket_id, basket.len())).write(*token);
                i += 1;
            };

            self.total_baskets.write(basket_id + 1);
            basket_id
        }

        fn get_basket(self: @ContractState, basket_id: u128) -> Basket {
            let mut tokens = array![];
            let basket_len = self.basket_len.entry(basket_id).read();
            for i in 0..basket_len {
                tokens.append(self.baskets.entry((basket_id, i)).read());
            };
            Basket { value: tokens.span() }
        }
    }
}
