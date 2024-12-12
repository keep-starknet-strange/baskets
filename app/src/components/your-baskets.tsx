"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpIcon, WalletIcon } from "lucide-react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function Dashboard({}) {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <section>
      <div className="mb-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              activeTab === "active"
                ? "bg-indigo-500 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("active")}
          >
            Active
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              activeTab === "closed"
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

const userBaskets = [
  {
    id: 1,
    name: "$ETHMAXI LP",
    performance: 15.2,
    deposited: "10,000",
    currentValue: "11,520",
  },
];
