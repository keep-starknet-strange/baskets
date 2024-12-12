"use client";

import { PlusCircle, MinusCircle } from "lucide-react";
import { useContract, useAccount } from "@starknet-react/core";
import { basketsAbi } from "@/lib/data/basketsAbi";
import { useState } from "react";

const BASKETS_ADDRESS =
  "0x2d8c2953c43dde1a0dcc729804d70e3dbf4841fd9205f0d28feb5544fceb27c";

export default function ActionButtons() {
  const { account } = useAccount();
  const { contract } = useContract({
    abi: basketsAbi,
    address: BASKETS_ADDRESS,
    provider: account,
  });
  const [amount, setAmount] = useState<string>("");

  const deposit = async () => {
    account?.execute([
      {
        contractAddress:
          "0x53b40a647cedfca6ca84f542a0fe36736031905a9639a7f19a3c1e66bfd5080",
        entrypoint: "approve",
        calldata: [BASKETS_ADDRESS, 1000000, 0],
      },
      {
        contractAddress: BASKETS_ADDRESS,
        entrypoint: "deposit",
        calldata: [0, 1000000, 0, amount],
      },
    ]);
  };

  const withdraw = async () => {
    await contract.withdraw(0);
  };

  return (
    <div className="flex justify-center space-x-4 flex-col">
      <div className="mt-6 mx-auto flex max-w-md gap-x-4">
        <label htmlFor="amount" className="sr-only">
          Amount
        </label>
        <input
          id="amount"
          name="amount"
          placeholder="amount"
          onChange={(e) => setAmount(e.target.value)}
          className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
        />
        <button
          onClick={() => deposit()}
          className="flex rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Deposit
        </button>
        <button
          onClick={() => withdraw()}
          className="flex rounded-md bg-rose-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          <MinusCircle className="mr-2 h-4 w-4" />
          Withdraw
        </button>
      </div>
    </div>
  );
}
