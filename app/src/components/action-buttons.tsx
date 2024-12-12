"use client";

import { PlusCircle, MinusCircle } from "lucide-react";
import { useContract, useAccount } from "@starknet-react/core";
import { basketsAbi } from "@/lib/data/basketsAbi";

const BASKETS_ADDRESS =
  "0x2d8c2953c43dde1a0dcc729804d70e3dbf4841fd9205f0d28feb5544fceb27c";

const tokens = [
  {
    id: 1,
    address:
      "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
    symbol: "STRK",
  },
  {
    id: 2,
    address:
      "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    symbol: "ETH",
  },
  {
    id: 3,
    address:
      "0x53b40a647cedfca6ca84f542a0fe36736031905a9639a7f19a3c1e66bfd5080",
    symbol: "USDC",
  },
];

export default function ActionButtons() {
  const { account } = useAccount();
  const { contract } = useContract({
    abi: basketsAbi,
    address: BASKETS_ADDRESS,
    provider: account,
  });

  const deposit = async () => {
    // account?.execute([{contractAddress: "0x53b40a647cedfca6ca84f542a0fe36736031905a9639a7f19a3c1e66bfd5080", entrypoint:, calldata: }])
    const res = await contract.deposit(1, 100000000, 10);
    alert("deposit successful");
  };

  const withdraw = async () => {
    const res = await contract.withdraw(1);
    alert("deposit successful");
  };

  return (
    <div className="flex justify-center space-x-4">
      <button
        onClick={() => deposit()}
        className="flex rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {" "}
        <PlusCircle className="mr-2 h-4 w-4" />
        Deposit
      </button>
      <button
        onClick={() => withdraw()}
        className="flex rounded-md bg-rose-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {" "}
        <MinusCircle className="mr-2 h-4 w-4" />
        Withdraw
      </button>
    </div>
  );
}
