"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpIcon, WalletIcon } from "lucide-react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useContract, useAccount } from "@starknet-react/core";
import { basketsAbi } from "@/lib/data/basketsAbi";

const BASKETS_ADDRESS =
  "0x2d8c2953c43dde1a0dcc729804d70e3dbf4841fd9205f0d28feb5544fceb27c";
const TOKENS =
{
  "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d":
    "STRK",
  "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7":
    "ETH",
  "0x53b40a647cedfca6ca84f542a0fe36736031905a9639a7f19a3c1e66bfd5080":
    "USDC",
};

const userBaskets = [
  {
    id: 1,
    name: "$ETHMAXI LP",
    performance: 15.2,
    deposited: "10,000",
    currentValue: "11,520",
    tokens: [{symbol:"ETH"}, {symbol:"STRK"}]
  },
];

export default function Dashboard({ }) {
  const [activeTab, setActiveTab] = useState("active");
  const { account } = useAccount();
  const { contract } = useContract({
    abi: basketsAbi,
    address: BASKETS_ADDRESS,
    provider: account,
  });

  useEffect(() => {
    const fetchBaskets = async () => {
      console.log("Fetching the baskets")
      let baskets = new Array();
      for (let i = 0; i <= 20; i++) {
        baskets.push(contract.get_basket(i));
      };
      let real_baskets = await Promise.all(baskets);
    };
    fetchBaskets();
    console.log("Fetched the baskets")

  }, []);

  return (
    <section>
      <div className="mb-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${activeTab === "active"
              ? "bg-indigo-500 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            onClick={() => setActiveTab("active")}
          >
            Active
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${activeTab === "closed"
              ? "bg-indigo-500 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            onClick={() => setActiveTab("closed")}
          >
            Closed
          </button>
        </div>
      </div>
      {activeTab === "active" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userBaskets.map((vault) => (
            <Link
              key={vault.id}
              href="/basket"
              className="bg-gray-800 border border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                    <WalletIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">{vault.name}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-500 text-sm">
                  <span>+{vault.performance}%</span>
                  <ArrowUpIcon className="w-4 h-4" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400">Deposited</p>
                  <p className="text-sm font-medium">${vault.deposited}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Current Value</p>
                  <p className="text-sm font-medium">${vault.currentValue}</p>
                </div>

                  {vault.tokens.map((token) => (
                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                      {token.symbol}
                    </span>
                  )}




              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">No closed Baskets</div>
      )}
      <Link href="/create">
        <button
          type="button"
          className="mt-4 flex gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-light text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusCircleIcon className="size-6" />
          create basket
        </button>
      </Link>
    </section>
  );
}
