"use client";

import { PlusCircle, MinusCircle } from "lucide-react";
import { useContract, useAccount } from "@starknet-react/core";
import { basketsAbi } from "@/lib/data/basketsAbi";

const BASKETS_ADDRESS =
  "0x2d8c2953c43dde1a0dcc729804d70e3dbf4841fd9205f0d28feb5544fceb27c";

export default function ActionButtons() {
  const { account } = useAccount();
  const { contract } = useContract({
    abi: basketsAbi,
    address: BASKETS_ADDRESS,
    provider: account,
  });

  const deposit = async () => {
    account?.execute([
      {
        contractAddress:
          "0x53b40a647cedfca6ca84f542a0fe36736031905a9639a7f19a3c1e66bfd5080",
        entrypoint: "approve",
        calldata: [BASKETS_ADDRESS, 1000, 0],
      },
      {
        contractAddress: BASKETS_ADDRESS,
        entrypoint: "deposit",
        calldata: [1, 1000, 0, 1],
      },
    ]);
    alert("deposit successful");
  };

  const withdraw = async () => {
    await contract.withdraw(1);
    alert("withdraw successful");
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
