"use client";

import {
  ArrowUpIcon,
  TrendingUpIcon,
  UserIcon,
  WalletIcon,
} from "lucide-react";
import { useAccount } from "@starknet-react/core";
import UserBaskets from "@/components/your-baskets";

export default function Dashboard() {
  const { status } = useAccount();

  return (
    <div className="min-h-screen bg-gray-900 text-white px-24 py-14">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Trending Baskets Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUpIcon className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Top Trending</h2>
            <em>(***just for show***)</em>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingBaskets.map((vault) => (
              <div
                key={vault.id}
                className="bg-gray-800 border border-gray-700 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                      <WalletIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">{vault.name}</h3>
                      <p className="text-xs text-gray-400">{vault.strategy}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-green-500 text-sm">
                    <span>+{vault.performance}%</span>
                    <ArrowUpIcon className="w-4 h-4" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">APY</p>
                    <p className="text-sm font-medium">{vault.apy}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">TVL</p>
                    <p className="text-sm font-medium">${vault.tvl}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* User Baskets Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <UserIcon className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Your Baskets</h2>
          </div>
          {status === "disconnected" ? (
            <div className="text-rose-200 font-extralight">
              please connect wallet...
            </div>
          ) : (
            <UserBaskets />
          )}
        </section>
      </div>
    </div>
  );
}

const trendingBaskets = [
  {
    id: 1,
    name: "BTC BULLS",
    strategy: "Bitcoin forward",
    performance: 12.5,
    apy: 24.6,
    tvl: "2.1M",
  },
  {
    id: 2,
    name: "Stable Bois",
    strategy: "Stable Yield gen",
    performance: 8.3,
    apy: 15.2,
    tvl: "4.5M",
  },
  {
    id: 3,
    name: "AI Squad",
    strategy: "Artificial Intelligence",
    performance: 18.7,
    apy: 32.1,
    tvl: "1.8M",
  },
];
