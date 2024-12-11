import type { Abi } from "starknet";

export const basketsAbi = [
  {
    name: "CreatorImpl",
    type: "impl",
    interface_name: "contracts::Creator",
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
    name: "contracts::creator::Token",
    type: "struct",
    members: [
      {
        name: "token",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "amount",
        type: "core::integer::u256",
      },
    ],
  },
  {
    name: "core::array::Span::<contracts::creator::Token>",
    type: "struct",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<contracts::creator::Token>",
      },
    ],
  },
  {
    name: "contracts::creator::Basket",
    type: "struct",
    members: [
      {
        name: "value",
        type: "core::array::Span::<contracts::creator::Token>",
      },
    ],
  },
  {
    name: "contracts::BasketInfo",
    type: "struct",
    members: [
      {
        name: "performance",
        type: "core::integer::u16",
      },
      {
        name: "liquidity",
        type: "core::integer::u128",
      },
      {
        name: "length",
        type: "core::integer::u32",
      },
    ],
  },
  {
    name: "contracts::Creator",
    type: "interface",
    items: [
      {
        name: "create_basket",
        type: "function",
        inputs: [
          {
            name: "basket",
            type: "core::array::Span::<contracts::creator::Token>",
          },
        ],
        outputs: [
          {
            type: "core::integer::u128",
          },
        ],
        state_mutability: "external",
      },
      {
        name: "get_basket",
        type: "function",
        inputs: [
          {
            name: "basket_id_key",
            type: "core::integer::u128",
          },
        ],
        outputs: [
          {
            type: "contracts::creator::Basket",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_basket_info",
        type: "function",
        inputs: [
          {
            name: "basket_id",
            type: "core::integer::u128",
          },
        ],
        outputs: [
          {
            type: "contracts::BasketInfo",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "deposit",
        type: "function",
        inputs: [
          {
            name: "basket_id",
            type: "core::integer::u128",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
          {
            name: "quantity",
            type: "core::integer::u128",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "withdraw",
        type: "function",
        inputs: [
          {
            name: "basket_id",
            type: "core::integer::u128",
          },
        ],
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
        name: "token_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    kind: "enum",
    name: "contracts::creator::Event",
    type: "event",
    variants: [],
  },
] as const satisfies Abi;
