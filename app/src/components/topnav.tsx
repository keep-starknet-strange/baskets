"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAccount, useConnect, argent, braavos } from "@starknet-react/core";
import Link from "next/link";
import Image from "next/image";

export default function TopNav() {
  const { connect, connectors } = useConnect();
  const { address, status } = useAccount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Baskets</span>
            <Image width={35} height={35} alt="" src="/basketsLogo.png" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text pb-2 text-xl font-semibold tracking-tighter text-transparent">
          Baskets
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {status === "disconnected" ? (
            <div className="flex flex-row">
              <div className="flex flex-row justify-between rounded-md border border-gray-700 mx-2 p-2 hover:bg-gray-200">
                <div
                  onClick={() => connect({ connector: braavos() })}
                  className="mx-2"
                >
                  <Image
                    width={6}
                    height={6}
                    alt="conn-icon"
                    src="braavos.svg"
                    className="w-6"
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between rounded-md border border-gray-700 mx-2 p-2 hover:bg-gray-200">
                <div
                  onClick={() => connect({ connector: argent() })}
                  className="mx-2"
                >
                  <Image
                    width={6}
                    height={6}
                    alt="conn-icon"
                    src="argent.svg"
                    className="w-6"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="font-thin text-gray rounded-md border border-gray-700 p-2 text-gray-500">
              ({address?.toString().slice(0, 10).toString()})
            </div>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Baskets</span>
              <Image width={35} height={35} alt="" src="basketsLogo.png" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-gray-800"
                >
                  Connect wallet
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
