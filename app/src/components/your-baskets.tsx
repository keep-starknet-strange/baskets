"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpIcon, WalletIcon } from "lucide-react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useContract, useAccount } from "@starknet-react/core";
import { basketsAbi } from "@/lib/data/basketsAbi";

const BASKETS_ADDRESS =
  "0x2d8c2953c43dde1a0dcc729804d70e3dbf4841fd9205f0d28feb5544fceb27c";
const TOKENS = {
  "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d": "STRK",
  "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7": "ETH",
  "0x53b40a647cedfca6ca84f542a0fe36736031905a9639a7f19a3c1e66bfd5080": "USDC",
};

const userBaskets = [
  {
    id: 1,
    name: "$ETHMAXI LP",
    performance: 15.2,
    deposited: "10,000",
    currentValue: "11,520",
    tokens: [{ symbol: "ETH" }, { symbol: "STRK" }],
  },
];

interface Basket {
  name: string;
  performance: number;
  liquidity: number;
  tokens: String[];
}

export default function Dashboard({}) {
  const [activeTab, setActiveTab] = useState("active");
  const [baskets, setBaskets] = useState<Basket[]>([]);
  const { account } = useAccount();
  const { contract } = useContract({
    abi: basketsAbi,
    address: BASKETS_ADDRESS,
    provider: account,
  });

  useEffect(() => {
    const fetchBaskets = async () => {
      let baskets = new Array();
      for (let i = 0; i <= 20; i++) {
        baskets.push(contract.get_basket(i));
      }
      let real_baskets = await Promise.all(baskets);
      console.log("REAL BASKETS: ", real_baskets);
      setBaskets(real_baskets);
    };
    fetchBaskets();
  }, []);

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

                <div className="flex flex-row">
                  {vault.tokens.map((token) => (
                    <div className="mx-1" key={token.symbol}>
                      <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 64 64"
                            width="20px"
                            height="20px"
                          >
                            <linearGradient
                              id="Yz6f8FIFqMLeHS3CJHqXla"
                              x1="32.5"
                              x2="32.5"
                              y1="7"
                              y2="59"
                              gradientUnits="userSpaceOnUse"
                              spreadMethod="reflect"
                            >
                              <stop offset="0" stop-color="#1a6dff" />
                              <stop offset="1" stop-color="#c822ff" />
                            </linearGradient>
                            <path
                              fill="url(#Yz6f8FIFqMLeHS3CJHqXla)"
                              d="M43.975,39.27c0.009-0.063,0.016-0.124,0.013-0.188c-0.004-0.07-0.02-0.135-0.039-0.203 c-0.011-0.04-0.007-0.081-0.023-0.121c-0.008-0.019-0.024-0.031-0.033-0.049c-0.029-0.06-0.069-0.112-0.11-0.166 c-0.041-0.055-0.08-0.108-0.131-0.152c-0.015-0.013-0.022-0.032-0.038-0.044c-0.033-0.026-0.073-0.033-0.109-0.054 c-0.061-0.037-0.12-0.071-0.188-0.094c-0.06-0.02-0.118-0.029-0.179-0.037c-0.065-0.009-0.128-0.017-0.195-0.013 c-0.068,0.004-0.131,0.02-0.197,0.038c-0.042,0.011-0.084,0.007-0.125,0.024C39.796,39.364,36.051,40,32.075,40 c-3.76,0-7.355-0.577-10.125-1.625c-0.512-0.194-1.093,0.064-1.289,0.582c-0.068,0.179-0.064,0.361-0.03,0.536 c-0.058,0.288-0.004,0.595,0.2,0.837C23.905,43.986,27.898,46,32.075,46c4.419,0,8.579-2.22,11.714-6.25 c0.027-0.034,0.034-0.075,0.055-0.111c0.036-0.06,0.069-0.118,0.092-0.184C43.957,39.393,43.966,39.333,43.975,39.27z M24.58,41.217 C26.881,41.725,29.443,42,32.075,42c2.629,0,5.174-0.267,7.459-0.768C37.291,43.023,34.733,44,32.075,44 C29.42,44,26.836,43.025,24.58,41.217z M27.204,27.993c1.387-0.592,3.161-0.917,4.996-0.917c1.943,0,3.797,0.361,5.219,1.016 c0.501,0.231,0.721,0.825,0.489,1.327C37.739,29.785,37.378,30,36.999,30c-0.14,0-0.282-0.029-0.418-0.092 c-1.164-0.537-2.72-0.833-4.381-0.833c-1.571,0-3.066,0.269-4.211,0.757c-0.505,0.215-1.096-0.019-1.313-0.527 C26.46,28.798,26.696,28.21,27.204,27.993z M42,31c0,1.072-0.317,1.896-0.943,2.447c-1.049,0.923-2.536,0.73-3.521,0.607 c-0.063-0.008-0.125-0.017-0.184-0.023C36.162,35.031,34.117,36,32,36s-4.162-0.969-5.353-1.969 c-0.059,0.007-0.12,0.016-0.184,0.023c-0.984,0.124-2.472,0.315-3.521-0.607C22.317,32.896,22,32.072,22,31c0-0.552,0.447-1,1-1 s1,0.448,1,1c0,0.325,0.046,0.753,0.266,0.946c0.367,0.325,1.355,0.2,1.945,0.124C26.523,32.031,26.797,32,27,32h0.414l0.293,0.293 C28.556,33.142,30.303,34,32,34s3.444-0.858,4.293-1.707L36.586,32H37c0.203,0,0.477,0.031,0.789,0.07 c0.589,0.076,1.575,0.201,1.945-0.124C39.954,31.753,40,31.325,40,31c0-0.552,0.447-1,1-1S42,30.448,42,31z M21.29,18.699 c-0.386-0.391-0.386-1.018,0.003-1.406c1.249-1.25,4.594-2.877,8.307-0.093c0.442,0.331,0.532,0.958,0.2,1.4 c-0.196,0.262-0.496,0.4-0.801,0.4c-0.209,0-0.419-0.065-0.599-0.2c-3.177-2.38-5.45-0.33-5.698-0.088 C22.307,19.096,21.676,19.089,21.29,18.699z M34.29,18.699c-0.386-0.391-0.386-1.018,0.003-1.406 c1.249-1.25,4.594-2.877,8.307-0.093c0.442,0.331,0.532,0.958,0.2,1.4c-0.196,0.262-0.496,0.4-0.801,0.4 c-0.209,0-0.419-0.065-0.599-0.2c-3.176-2.38-5.449-0.33-5.698-0.088C35.306,19.096,34.675,19.089,34.29,18.699z M19.895,33.447 c-0.043,0.086-0.992,1.951-2.895,3.137V40c0,0.553-0.447,1-1,1s-1-0.447-1-1v-4c0-0.379,0.214-0.725,0.553-0.895 c1.655-0.828,2.544-2.536,2.553-2.553c0.247-0.494,0.848-0.692,1.342-0.447C19.941,32.353,20.142,32.953,19.895,33.447z M48.447,35.105C48.786,35.275,49,35.621,49,36v4c0,0.553-0.447,1-1,1s-1-0.447-1-1v-3.416c-1.902-1.186-2.852-3.051-2.895-3.137 c-0.247-0.494-0.047-1.095,0.447-1.342c0.493-0.244,1.094-0.048,1.341,0.445C45.917,32.596,46.799,34.281,48.447,35.105z M56,8 c-1.437,0-2.668,0.998-3.372,2.522c-0.095,0.154-0.195,0.31-0.289,0.463c-0.98,1.609-1.905,3.129-4.243,4.925l-0.789,0.606 C44.55,11.959,39.764,7,32,7c-5.849,0-10.977,3.132-14.886,9.072l-0.211-0.162c-2.338-1.796-3.263-3.316-4.243-4.925 c-0.093-0.153-0.194-0.309-0.289-0.463C11.668,8.998,10.437,8,9,8c-2.243,0-4,2.416-4,5.5S6.757,19,9,19 c0.109,0,0.211-0.032,0.318-0.043c1.679,0.076,2.216,0.394,3.929,1.711l1.022,0.786c-0.23,0.542-0.46,1.068-0.685,1.585 C11.661,27.456,10,31.271,10,39.037C10,49.485,20.486,59,32,59s22-9.515,22-19.963c0-6.723-2.009-11.966-4.044-16.988l1.797-1.381 c1.713-1.317,2.25-1.635,3.929-1.711C55.789,18.968,55.891,19,56,19c2.243,0,4-2.416,4-5.5S58.243,8,56,8z M9,10 c0.404,0,0.822,0.274,1.175,0.734c0.019,0.041,0.024,0.086,0.05,0.125c0.139,0.213,0.263,0.42,0.393,0.63 C10.852,12.043,11,12.728,11,13.5c0,1.898-0.892,3.251-1.771,3.458c-0.184-0.007-0.36-0.017-0.563-0.019 C7.822,16.651,7,15.321,7,13.5C7,11.438,8.054,10,9,10z M50.534,19.082l-2.4,1.845c-0.356,0.274-0.486,0.753-0.317,1.169 C49.873,27.157,52,32.391,52,39.037C52,48.438,42.468,57,32,57s-20-8.562-20-17.963c0-7.35,1.509-10.814,3.419-15.2 c0.325-0.747,0.659-1.514,0.995-2.323c0.173-0.418,0.045-0.9-0.314-1.176l-1.634-1.256c-1.069-0.821-1.82-1.341-2.635-1.664 c0.51-0.696,0.87-1.591,1.045-2.596c0.702,0.847,1.581,1.73,2.809,2.674l1.08,0.83c0.226,0.174,0.518,0.242,0.793,0.19 c0.279-0.052,0.523-0.221,0.671-0.464C21.875,12.045,26.509,9,32,9c7.363,0,11.752,5.159,14.137,9.487 c0.141,0.255,0.386,0.437,0.672,0.497c0.067,0.014,0.136,0.021,0.204,0.021c0.219,0,0.434-0.072,0.609-0.207l1.693-1.302 c1.228-0.944,2.107-1.827,2.809-2.674c0.175,1.005,0.535,1.899,1.045,2.596C52.354,17.741,51.603,18.261,50.534,19.082z M56.334,16.938c-0.203,0.003-0.379,0.012-0.563,0.019C54.892,16.751,54,15.398,54,13.5c0-0.772,0.148-1.457,0.383-2.011 c0.13-0.209,0.254-0.417,0.393-0.63c0.026-0.039,0.03-0.084,0.05-0.125C55.178,10.274,55.596,10,56,10c0.946,0,2,1.438,2,3.5 C58,15.321,57.178,16.651,56.334,16.938z"
                            />
                            <linearGradient
                              id="Yz6f8FIFqMLeHS3CJHqXlb"
                              x1="32"
                              x2="32"
                              y1="10.875"
                              y2="60.715"
                              gradientUnits="userSpaceOnUse"
                              spreadMethod="reflect"
                            >
                              <stop offset="0" stop-color="#6dc7ff" />
                              <stop offset="1" stop-color="#e6abff" />
                            </linearGradient>
                            <path
                              fill="url(#Yz6f8FIFqMLeHS3CJHqXlb)"
                              d="M24.5,26c-1.381,0-2.5-1.119-2.5-2.5s1.119-2.5,2.5-2.5s2.5,1.119,2.5,2.5S25.881,26,24.5,26z M39.5,21c-1.381,0-2.5,1.119-2.5,2.5s1.119,2.5,2.5,2.5s2.5-1.119,2.5-2.5S40.881,21,39.5,21z M32,48c-3.588,0-6.677,1.637-8.122,4 h16.245C38.677,49.637,35.588,48,32,48z"
                            />
                          </svg>{" "}
                        </div>
                        {token.symbol}
                      </span>
                    </div>
                  ))}
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
