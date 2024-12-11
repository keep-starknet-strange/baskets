use starknet::ContractAddress;

use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};
use snforge_std::{CheatSpan, cheat_account_contract_address, cheat_caller_address};
use contracts::{FomoDispatcherTrait, FomoDispatcher};
use starknet::{contract_address_const};
use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
use snforge_std::start_cheat_block_timestamp_global;

fn AMOUNT() -> u256 {
    10000000000000000000
}
fn USER() -> ContractAddress {
    contract_address_const::<0x1>()
}

fn TIME_DELTA() -> u64 {
    1000
}

fn setup_contracts() -> (FomoDispatcher, IERC20Dispatcher) {
    let erc20_address = deploy_erc20(
        name: "NAME",
        symbol: "SYMBOL",
        supply: 10 * AMOUNT(),
        recipient: contract_address_const::<0x1>(),
        owner: contract_address_const::<0x1>(),
    );
    let contract = declare("fomo").unwrap().contract_class();
    let mut constructor_calldata = array![];
    TIME_DELTA().serialize(ref constructor_calldata);
    erc20_address.serialize(ref constructor_calldata);
    let (contract_address, _) = contract.deploy(@constructor_calldata).unwrap();
    (FomoDispatcher { contract_address }, IERC20Dispatcher { contract_address: erc20_address })
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
fn test_action() {
    let (fomo, token) = setup_contracts();

    // Assert all the values are zero.
    assert_eq!(fomo.get_time_delta(), TIME_DELTA());
    assert_eq!(fomo.get_last_action(), 0);
    assert_eq!(fomo.get_realse_time(), 0);
    assert_eq!(fomo.get_last_user(), contract_address_const::<0x0>());

    // Call the action function.
    cheat_caller_address_once(contract_address: token.contract_address, caller_address: USER());
    token.approve(spender: fomo.contract_address, amount: AMOUNT());
    cheat_caller_address_once(contract_address: fomo.contract_address, caller_address: USER());
    start_cheat_block_timestamp_global(1000);
    fomo.action();

    // Assert the values are updated.
    assert_eq!(fomo.get_last_action(), 1000);
    assert_eq!(fomo.get_last_user(), USER());
    assert_eq!(fomo.get_realse_time(), 2000);
    assert_eq!(token.balance_of(account: fomo.contract_address), 1000000);

    // Transfer tokens to other user.
    cheat_caller_address_once(contract_address: token.contract_address, caller_address: USER());
    let user_2 = contract_address_const::<0x2>();
    token.transfer(recipient: user_2, amount: AMOUNT() / 2);

    // Call the action function again.
    cheat_caller_address_once(contract_address: token.contract_address, caller_address: user_2);
    token.approve(spender: fomo.contract_address, amount: AMOUNT() / 2);
    cheat_caller_address_once(contract_address: fomo.contract_address, caller_address: user_2);
    start_cheat_block_timestamp_global(1500);
    fomo.action();

    // Assert the values are updated.
    assert_eq!(fomo.get_last_action(), 1500);
    assert_eq!(fomo.get_last_user(), user_2);
    assert_eq!(fomo.get_realse_time(), 2500);
    assert_eq!(token.balance_of(account: fomo.contract_address), 1000000 * 2);

    // Collect with the seconds user.
    cheat_caller_address_once(contract_address: fomo.contract_address, caller_address: user_2);
    start_cheat_block_timestamp_global(2500);
    fomo.collect();

    // Assert the values are updated.
    assert_eq!(token.balance_of(account: user_2), 1000000 + (AMOUNT() / 2));
    assert_eq!(fomo.get_last_action(), 2500);
    assert_eq!(fomo.get_last_user(), user_2);
    assert_eq!(fomo.get_realse_time(), 3500);
}
