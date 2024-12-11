import type { Abi } from "starknet";

export const poolAbi = [
  {
    name: "JediSwapV2PoolImpl",
    type: "impl",
    interface_name: "jediswap_v2_core::jediswap_v2_pool::IJediSwapV2Pool",
  },
  {
    name: "core::integer::u256",
    type: "struct",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    name: "core::bool",
    type: "enum",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    name: "jediswap_v2_core::libraries::signed_integers::i32::i32",
    type: "struct",
    members: [
      {
        name: "mag",
        type: "core::integer::u32",
      },
      {
        name: "sign",
        type: "core::bool",
      },
    ],
  },
  {
    name: "jediswap_v2_core::jediswap_v2_pool::ProtocolFees",
    type: "struct",
    members: [
      {
        name: "token0",
        type: "core::integer::u128",
      },
      {
        name: "token1",
        type: "core::integer::u128",
      },
    ],
  },
  {
    name: "jediswap_v2_core::libraries::signed_integers::i128::i128",
    type: "struct",
    members: [
      {
        name: "mag",
        type: "core::integer::u128",
      },
      {
        name: "sign",
        type: "core::bool",
      },
    ],
  },
  {
    name: "jediswap_v2_core::libraries::tick::TickInfo",
    type: "struct",
    members: [
      {
        name: "liquidity_gross",
        type: "core::integer::u128",
      },
      {
        name: "liquidity_net",
        type: "jediswap_v2_core::libraries::signed_integers::i128::i128",
      },
      {
        name: "fee_growth_outside_0_X128",
        type: "core::integer::u256",
      },
      {
        name: "fee_growth_outside_1_X128",
        type: "core::integer::u256",
      },
    ],
  },
  {
    name: "jediswap_v2_core::libraries::position::PositionKey",
    type: "struct",
    members: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "tick_lower",
        type: "jediswap_v2_core::libraries::signed_integers::i32::i32",
      },
      {
        name: "tick_upper",
        type: "jediswap_v2_core::libraries::signed_integers::i32::i32",
      },
    ],
  },
  {
    name: "jediswap_v2_core::libraries::position::PositionInfo",
    type: "struct",
    members: [
      {
        name: "liquidity",
        type: "core::integer::u128",
      },
      {
        name: "fee_growth_inside_0_last_X128",
        type: "core::integer::u256",
      },
      {
        name: "fee_growth_inside_1_last_X128",
        type: "core::integer::u256",
      },
      {
        name: "tokens_owed_0",
        type: "core::integer::u128",
      },
      {
        name: "tokens_owed_1",
        type: "core::integer::u128",
      },
    ],
  },
  {
    name: "jediswap_v2_core::libraries::signed_integers::i256::i256",
    type: "struct",
    members: [
      {
        name: "mag",
        type: "core::integer::u256",
      },
      {
        name: "sign",
        type: "core::bool",
      },
    ],
  },
  {
    name: "jediswap_v2_core::jediswap_v2_pool::IJediSwapV2Pool",
    type: "interface",
    items: [
      {
        name: "get_factory",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_token0",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_token1",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_fee",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u32",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_tick_spacing",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u32",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_max_liquidity_per_tick",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u128",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_sqrt_price_X96",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_tick",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "jediswap_v2_core::libraries::signed_integers::i32::i32",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_fee_protocol",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u8",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_fee_growth_global_0_X128",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_fee_growth_global_1_X128",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_protocol_fees",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "jediswap_v2_core::jediswap_v2_pool::ProtocolFees",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_liquidity",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u128",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_tick_info",
        type: "function",
        inputs: [
          {
            name: "tick",
            type: "jediswap_v2_core::libraries::signed_integers::i32::i32",
          },
        ],
        outputs: [
          {
            type: "jediswap_v2_core::libraries::tick::TickInfo",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_position_info",
        type: "function",
        inputs: [
          {
            name: "position_key",
            type: "jediswap_v2_core::libraries::position::PositionKey",
          },
        ],
        outputs: [
          {
            type: "jediswap_v2_core::libraries::position::PositionInfo",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "static_collect",
        type: "function",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "tick_lower",
            type: "jediswap_v2_core::libraries::signed_integers::i32::i32",
          },
          {
            name: "tick_upper",
            type: "jediswap_v2_core::libraries::signed_integers::i32::i32",
          },
          {
            name: "amount0_requested",
            type: "core::integer::u128",
          },
          {
            name: "amount1_requested",
            type: "core::integer::u128",
          },
        ],
        outputs: [
          {
            type: "(core::integer::u128, core::integer::u128)",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "initialize",
        type: "function",
        inputs: [
          {
            name: "sqrt_price_X96",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "mint",
        type: "function",
        inputs: [
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "tick_lower",
            type: "jediswap_v2_core::libraries::signed_integers::i32::i32",
          },
          {
            name: "tick_upper",
            type: "jediswap_v2_core::libraries::signed_integers::i32::i32",
          },
          {
            name: "amount",
            type: "core::integer::u128",
          },
          {
            name: "data",
            type: "core::array::Array::<core::felt252>",
          },
        ],
        outputs: [
          {
            type: "(core::integer::u256, core::integer::u256)",
          },
        ],
        state_mutability: "external",
      },
      {
        name: "collect",
        type: "function",
        inputs: [
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "tick_lower",
            type: "jediswap_v2_core::libraries::signed_integers::i32::i32",
          },
          {
            name: "tick_upper",
            type: "jediswap_v2_core::libraries::signed_integers::i32::i32",
          },
          {
            name: "amount0_requested",
            type: "core::integer::u128",
          },
          {
            name: "amount1_requested",
            type: "core::integer::u128",
          },
        ],
        outputs: [
          {
            type: "(core::integer::u128, core::integer::u128)",
          },
        ],
        state_mutability: "external",
      },
      {
        name: "burn",
        type: "function",
        inputs: [
          {
            name: "tick_lower",
            type: "jediswap_v2_core::libraries::signed_integers::i32::i32",
          },
          {
            name: "tick_upper",
            type: "jediswap_v2_core::libraries::signed_integers::i32::i32",
          },
          {
            name: "amount",
            type: "core::integer::u128",
          },
        ],
        outputs: [
          {
            type: "(core::integer::u256, core::integer::u256)",
          },
        ],
        state_mutability: "external",
      },
      {
        name: "swap",
        type: "function",
        inputs: [
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "zero_for_one",
            type: "core::bool",
          },
          {
            name: "amount_specified",
            type: "jediswap_v2_core::libraries::signed_integers::i256::i256",
          },
          {
            name: "sqrt_price_limit_X96",
            type: "core::integer::u256",
          },
          {
            name: "data",
            type: "core::array::Array::<core::felt252>",
          },
        ],
        outputs: [
          {
            type: "(jediswap_v2_core::libraries::signed_integers::i256::i256, jediswap_v2_core::libraries::signed_integers::i256::i256)",
          },
        ],
        state_mutability: "external",
      },
      {
        name: "collect_protocol",
        type: "function",
        inputs: [
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount0_requested",
            type: "core::integer::u128",
          },
          {
            name: "amount1_requested",
            type: "core::integer::u128",
          },
        ],
        outputs: [
          {
            type: "(core::integer::u128, core::integer::u128)",
          },
        ],
        state_mutability: "external",
      },
      {
        name: "upgrade",
        type: "function",
        inputs: [
          {
            name: "new_class_hash",
            type: "core::starknet::class_hash::ClassHash",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "pause_burn",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "unpause_burn",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    name: "constructor",
    type: "constructor",
    inputs: [
      {
        name: "token0",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "token1",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "fee",
        type: "core::integer::u32",
      },
      {
        name: "tick_spacing",
        type: "core::integer::u32",
      },
    ],
  },
  {
    kind: "struct",
    name: "jediswap_v2_core::jediswap_v2_pool::JediSwapV2Pool::Initialize",
    type: "event",
    members: [
      {
        kind: "data",
        name: "sqrt_price_X96",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "tick",
        type: "jediswap_v2_core::libraries::signed_integers::i32::i32",
      },
    ],
  },
  {
    kind: "struct",
    name: "jediswap_v2_core::jediswap_v2_pool::JediSwapV2Pool::Mint",
    type: "event",
    members: [
      {
        kind: "data",
        name: "sender",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "tick_lower",
        type: "jediswap_v2_core::libraries::signed_integers::i32::i32",
      },
      {
        kind: "data",
        name: "tick_upper",
        type: "jediswap_v2_core::libraries::signed_integers::i32::i32",
      },
      {
        kind: "data",
        name: "amount",
        type: "core::integer::u128",
      },
      {
        kind: "data",
        name: "amount0",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "amount1",
        type: "core::integer::u256",
      },
    ],
  },
  {
    kind: "struct",
    name: "jediswap_v2_core::jediswap_v2_pool::JediSwapV2Pool::Collect",
    type: "event",
    members: [
      {
        kind: "data",
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "tick_lower",
        type: "jediswap_v2_core::libraries::signed_integers::i32::i32",
      },
      {
        kind: "data",
        name: "tick_upper",
        type: "jediswap_v2_core::libraries::signed_integers::i32::i32",
      },
      {
        kind: "data",
        name: "amount0",
        type: "core::integer::u128",
      },
      {
        kind: "data",
        name: "amount1",
        type: "core::integer::u128",
      },
    ],
  },
  {
    kind: "struct",
    name: "jediswap_v2_core::jediswap_v2_pool::JediSwapV2Pool::Burn",
    type: "event",
    members: [
      {
        kind: "data",
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "tick_lower",
        type: "jediswap_v2_core::libraries::signed_integers::i32::i32",
      },
      {
        kind: "data",
        name: "tick_upper",
        type: "jediswap_v2_core::libraries::signed_integers::i32::i32",
      },
      {
        kind: "data",
        name: "amount",
        type: "core::integer::u128",
      },
      {
        kind: "data",
        name: "amount0",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "amount1",
        type: "core::integer::u256",
      },
    ],
  },
  {
    kind: "struct",
    name: "jediswap_v2_core::jediswap_v2_pool::JediSwapV2Pool::Swap",
    type: "event",
    members: [
      {
        kind: "data",
        name: "sender",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "amount0",
        type: "jediswap_v2_core::libraries::signed_integers::i256::i256",
      },
      {
        kind: "data",
        name: "amount1",
        type: "jediswap_v2_core::libraries::signed_integers::i256::i256",
      },
      {
        kind: "data",
        name: "sqrt_price_X96",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "liquidity",
        type: "core::integer::u128",
      },
      {
        kind: "data",
        name: "tick",
        type: "jediswap_v2_core::libraries::signed_integers::i32::i32",
      },
    ],
  },
  {
    kind: "struct",
    name: "jediswap_v2_core::jediswap_v2_pool::JediSwapV2Pool::CollectProtocol",
    type: "event",
    members: [
      {
        kind: "data",
        name: "sender",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "amount0",
        type: "core::integer::u128",
      },
      {
        kind: "data",
        name: "amount1",
        type: "core::integer::u128",
      },
    ],
  },
  {
    kind: "enum",
    name: "jediswap_v2_core::libraries::position::PositionComponent::Event",
    type: "event",
    variants: [],
  },
  {
    kind: "enum",
    name: "jediswap_v2_core::libraries::tick::TickComponent::Event",
    type: "event",
    variants: [],
  },
  {
    kind: "enum",
    name: "jediswap_v2_core::libraries::tick_bitmap::TickBitmapComponent::Event",
    type: "event",
    variants: [],
  },
  {
    kind: "struct",
    name: "openzeppelin::upgrades::upgradeable::UpgradeableComponent::Upgraded",
    type: "event",
    members: [
      {
        kind: "data",
        name: "class_hash",
        type: "core::starknet::class_hash::ClassHash",
      },
    ],
  },
  {
    kind: "enum",
    name: "openzeppelin::upgrades::upgradeable::UpgradeableComponent::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "Upgraded",
        type: "openzeppelin::upgrades::upgradeable::UpgradeableComponent::Upgraded",
      },
    ],
  },
  {
    kind: "enum",
    name: "jediswap_v2_core::jediswap_v2_pool::JediSwapV2Pool::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "Initialize",
        type: "jediswap_v2_core::jediswap_v2_pool::JediSwapV2Pool::Initialize",
      },
      {
        kind: "nested",
        name: "Mint",
        type: "jediswap_v2_core::jediswap_v2_pool::JediSwapV2Pool::Mint",
      },
      {
        kind: "nested",
        name: "Collect",
        type: "jediswap_v2_core::jediswap_v2_pool::JediSwapV2Pool::Collect",
      },
      {
        kind: "nested",
        name: "Burn",
        type: "jediswap_v2_core::jediswap_v2_pool::JediSwapV2Pool::Burn",
      },
      {
        kind: "nested",
        name: "Swap",
        type: "jediswap_v2_core::jediswap_v2_pool::JediSwapV2Pool::Swap",
      },
      {
        kind: "nested",
        name: "CollectProtocol",
        type: "jediswap_v2_core::jediswap_v2_pool::JediSwapV2Pool::CollectProtocol",
      },
      {
        kind: "flat",
        name: "PositionEvent",
        type: "jediswap_v2_core::libraries::position::PositionComponent::Event",
      },
      {
        kind: "flat",
        name: "TickEvent",
        type: "jediswap_v2_core::libraries::tick::TickComponent::Event",
      },
      {
        kind: "flat",
        name: "TickBitmapEvent",
        type: "jediswap_v2_core::libraries::tick_bitmap::TickBitmapComponent::Event",
      },
      {
        kind: "flat",
        name: "UpgradeableEvent",
        type: "openzeppelin::upgrades::upgradeable::UpgradeableComponent::Event",
      },
    ],
  },
] as const satisfies Abi;
