use starknet::ContractAddress;
use openzeppelin::token::erc20::interface::IERC20Dispatcher;

#[starknet::interface]
pub trait Fomo<TContractState> {
    fn action(ref self: TContractState) -> Time;
    fn collect(ref self: TContractState);
    fn get_time_delta(self: @TContractState) -> Time;
    fn get_last_action(self: @TContractState) -> Time;
    fn get_realse_time(self: @TContractState) -> Time;
    fn get_last_user(self: @TContractState) -> ContractAddress;
    fn get_token_dispatcher(self: @TContractState) -> IERC20Dispatcher;
}

pub type Time = u64;

#[starknet::contract]
pub mod fomo {
    use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
    use starknet::{ContractAddress, get_caller_address, get_contract_address, get_block_timestamp};
    use super::Time;

    const AMOUNT: u256 = 1000000;


    #[constructor]
    fn constructor(ref self: ContractState, time_delta: Time, token_address: ContractAddress) {
        self.time_delta.write(time_delta);
        self.token_dispatcher.write(IERC20Dispatcher { contract_address: token_address });
    }

    #[storage]
    pub struct Storage {
        time_delta: Time,
        last_action: Time,
        realse_time: Time,
        last_user: ContractAddress,
        token_dispatcher: IERC20Dispatcher,
    }

    #[abi(embed_v0)]
    impl FomoImpl of super::Fomo<ContractState> {
        fn action(ref self: ContractState) -> Time {
            // Upadate the last action.
            let user = get_caller_address();
            let current_time = get_block_timestamp();
            self.last_action.write(current_time);

            // Update the last user.
            self.last_user.write(user);

            // Update the realse time.
            let realse_time = current_time + self.time_delta.read();
            self.realse_time.write(realse_time);

            // Trasfer to the contract.
            self
                .token_dispatcher
                .read()
                .transfer_from(
                    sender: get_caller_address(), recipient: get_contract_address(), amount: AMOUNT,
                );

            realse_time
        }

        fn collect(ref self: ContractState) {
            // Check that the caller is the last user.
            let user = get_caller_address();
            let last_user = self.last_user.read();
            assert!(user == last_user);

            // Check enough time passed.
            let current_time = get_block_timestamp();
            let realse_time = self.realse_time.read();
            assert!(current_time >= realse_time);

            // Transfer the token to the user.
            let contract_address = get_contract_address();
            let amount = self.token_dispatcher.read().balance_of(account: contract_address);
            self.token_dispatcher.read().transfer(recipient: user, :amount);

            // Update all storage variables.
            self.last_action.write(current_time);
            self.last_user.write(user);
            self.realse_time.write(current_time + self.time_delta.read());
        }

        // implemnt all the getters for the storage variables
        fn get_time_delta(self: @ContractState) -> Time {
            self.time_delta.read()
        }
        fn get_last_action(self: @ContractState) -> Time {
            self.last_action.read()
        }
        fn get_realse_time(self: @ContractState) -> Time {
            self.realse_time.read()
        }
        fn get_last_user(self: @ContractState) -> ContractAddress {
            self.last_user.read()
        }
        fn get_token_dispatcher(self: @ContractState) -> IERC20Dispatcher {
            self.token_dispatcher.read()
        }
    }
}
