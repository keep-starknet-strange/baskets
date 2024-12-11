use starknet::ContractAddress;

use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};
use snforge_std::{CheatSpan, cheat_account_contract_address, cheat_caller_address};
use contracts::{CreatorDispatcherTrait, CreatorDispatcher, creator::{Basket, Token}};
use starknet::{contract_address_const};
use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};

fn deploy_main_contract(token_address: ContractAddress) -> ContractAddress {
    let contract = declare("creator").unwrap().contract_class();
    let mut constructor_calldata = array![];
    token_address.serialize(ref constructor_calldata);
    let (contract_address, _) = contract.deploy(@constructor_calldata).unwrap();
    contract_address
}

pub fn deploy_erc20(
    name: ByteArray,
    symbol: ByteArray,
    supply: u256,
    recipient: ContractAddress,
    owner: ContractAddress,
) -> ContractAddress {
    let contract = declare("ERC20Upgradeable").unwrap().contract_class();
    let mut constructor_calldata = array![];
    name.serialize(ref constructor_calldata);
    symbol.serialize(ref constructor_calldata);
    supply.serialize(ref constructor_calldata);
    recipient.serialize(ref constructor_calldata);
    owner.serialize(ref constructor_calldata);
    let (contract_address, _) = contract
        .deploy(@constructor_calldata)
        .expect('failed to deploy erc20');
    contract_address
}

pub fn cheat_caller_address_once(
    contract_address: ContractAddress, caller_address: ContractAddress,
) {
    cheat_caller_address(:contract_address, :caller_address, span: CheatSpan::TargetCalls(1));
    cheat_account_contract_address(
        :contract_address,
        account_contract_address: caller_address,
        span: CheatSpan::TargetCalls(1),
    );
}


#[test]
fn test_create_basket() {
    let contract_address = deploy_main_contract(token_address: contract_address_const::<0x1>());

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

#[test]
fn test_deposit_and_withdraw() {
    let erc20_address = deploy_erc20(
        name: "NAME",
        symbol: "SYMBOL",
        supply: 10000000000000000000,
        recipient: contract_address_const::<0x1>(),
        owner: contract_address_const::<0x1>(),
    );
    let contract_address = deploy_main_contract(token_address: erc20_address);

    let dispatcher = CreatorDispatcher { contract_address };
    let erc20_dispatcher = IERC20Dispatcher { contract_address: erc20_address };
    let basket = array![
        Token { amount: 1, token: erc20_address }, Token { amount: 2, token: erc20_address },
    ]
        .span();

    let basket_id_key = dispatcher.create_basket(:basket);
    let basket_id = (basket_id_key, basket.len());

    // first deposit
    let caller_address = contract_address_const::<0x1>();
    cheat_caller_address_once(contract_address: erc20_address, :caller_address);
    erc20_dispatcher.approve(spender: contract_address, amount: 10000000000000000000);
    cheat_caller_address_once(:contract_address, :caller_address);
    dispatcher.deposit(:basket_id);
    let basket_info = dispatcher.get_basket_info(:basket_id);
    assert_eq!(basket_info.liquidity, 1);

    // second deposit
    cheat_caller_address_once(:contract_address, :caller_address);
    dispatcher.deposit(:basket_id);
    let basket_info = dispatcher.get_basket_info(:basket_id);
    assert_eq!(basket_info.liquidity, 2);

    // first withdraw
    cheat_caller_address_once(:contract_address, :caller_address);
    dispatcher.withdraw(:basket_id);
    let basket_info = dispatcher.get_basket_info(:basket_id);
    assert_eq!(basket_info.liquidity, 1);

    // second withdraw
    cheat_caller_address_once(:contract_address, :caller_address);
    dispatcher.withdraw(:basket_id);
    let basket_info = dispatcher.get_basket_info(:basket_id);
    assert_eq!(basket_info.liquidity, 0);
}

#[test]
#[should_panic(expected: "User have nothing to withdraw")]
fn test_withdraw_without_deposit() {
    let contract_address = deploy_main_contract(token_address: contract_address_const::<0x1>());
    let erc20_address = deploy_erc20(
        name: "NAME",
        symbol: "SYMBOL",
        supply: 10000000000000000000,
        recipient: contract_address_const::<0x1>(),
        owner: contract_address_const::<0x1>(),
    );

    let dispatcher = CreatorDispatcher { contract_address };
    let basket = array![
        Token { amount: 1, token: erc20_address }, Token { amount: 2, token: erc20_address },
    ]
        .span();

    let basket_id_key = dispatcher.create_basket(:basket);
    let basket_id = (basket_id_key, basket.len());

    dispatcher.withdraw(:basket_id);
}

