'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpIcon, TrendingUpIcon, UserIcon, WalletIcon } from 'lucide-react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('active')

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Trending Baskets Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUpIcon className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Top Trending</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingBaskets.map((vault) => (
              <div key={vault.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
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
          <div className="mb-4">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  activeTab === 'active'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('active')}
              >
                Active
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  activeTab === 'closed'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('closed')}
              >
                Closed
              </button>
            </div>
          </div>
          {activeTab === 'active' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userBaskets.map((vault) => (
                <Link key={vault.id} href="/basket" className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
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
        </section>
      </div>
    </div>
  )
}

const trendingBaskets = [
  {
    id: 1,
    name: "ETH-BTC LP Vault",
    strategy: "Delta Neutral",
    performance: 12.5,
    apy: 24.6,
    tvl: "2.1M",
  },
  {
    id: 2,
    name: "USDC Yield",
    strategy: "Stable Yield",
    performance: 8.3,
    apy: 15.2,
    tvl: "4.5M",
  },
  {
    id: 3,
    name: "SOL-USDC LP",
    strategy: "Market Making",
    performance: 18.7,
    apy: 32.1,
    tvl: "1.8M",
  },
]

const userBaskets = [
  {
    id: 1,
    name: "ETH-BTC LP Vault",
    strategy: "Delta Neutral",
    performance: 15.2,
    deposited: "10,000",
    currentValue: "11,520",
  },
  {
    id: 2,
    name: "USDC Yield",
    strategy: "Stable Yield",
    performance: 7.8,
    deposited: "5,000",
    currentValue: "5,390",
  },
]

