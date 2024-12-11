use starknet::ContractAddress;

use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};

use contracts::{CreatorDispatcherTrait, CreatorDispatcher, creator::{Basket, Token}};
use starknet::contract_address_const;

fn deploy_main_contract() -> ContractAddress {
    let contract = declare("creator").unwrap().contract_class();
    let mut constructor_calldata = array![];
    let (contract_address, _) = contract.deploy(@constructor_calldata).unwrap();
    contract_address
}

#[test]
fn test_create_basket() {
    let contract_address = deploy_main_contract();

    let dispatcher = CreatorDispatcher { contract_address };
    let basket = array![
        Token { amount: 1, token: contract_address_const::<0x1>() },
        Token { amount: 2, token: contract_address_const::<0x2>() },
    ]
        .span();

    let basket_id = dispatcher.create_basket(basket);

    assert_eq!(basket_id, 0, "invalid basket id");

    let created_basket = dispatcher.get_basket(basket_id);
    assert_eq!(created_basket, Basket { value: basket }, "invalid basket ");
}

