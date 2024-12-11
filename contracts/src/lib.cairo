use creator::{Basket, Token};


#[starknet::interface]
pub trait Creator<T> {
    fn create_basket(ref self: T, Array<Token>) -> u64;
    fn get_basket(self: @T, basket_id: u64) -> Basket;
    // fn get_performance(self: @T, basket_id: u64) -> BasketInfo { performance, liquidity };
}




#[starknet::contract]
pub mod creator {
    use starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess, StoragePathEntry, Map,
         Vec, VecTrait, MutableVecTrait,
    };
    use starknet::ContractAddress;

    #[phantom]
    pub struct Token {
        token: ContractAddress,
        amount: u256
    }

    pub struct Basket {
        value: Span<Token>
    }
    #[phantom]
    pub struct StorageBasket {
        value: Vec<Token>
    }

    #[storage]
    pub struct Storage {
        baskets: Vec<Baskets>
    }


    
}
