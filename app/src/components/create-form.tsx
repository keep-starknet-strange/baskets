"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
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

const formSchema = z.object({
  symbol: z.string().min(2, {
    message: "All upper case.",
  }),
});

interface SelectedElement {
  token: string;
  amount: number;
}

type FormSchemaType = z.infer<typeof formSchema>;

export default function CryptoBasketForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newElement, setNewElement] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const { account } = useAccount();
  const [selectedElements, setSelectedElements] = useState<SelectedElement[]>(
    [],
  );
  const { contract } = useContract({
    abi: basketsAbi,
    address: BASKETS_ADDRESS,
    provider: account,
  });

  const handleAddElement = () => {
    if (newElement && amount) {
      setSelectedElements([
        ...selectedElements,
        { token: newElement, amount: Number(amount) },
      ]);
      setNewElement("");
      setAmount("");
    }
  };

  const handleRemoveElement = (index: number) => {
    setSelectedElements(selectedElements.filter((_, i) => i !== index));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symbol: "",
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async () => {
    setIsSubmitting(true);
    const res = await contract.create_basket(selectedElements);
    alert("Basket created successfully!" + res);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mx-6 lg:mx-20">
      <div>
        <label
          htmlFor="symbol"
          className="block text-sm font-medium text-gray-300"
        >
          Symbol
        </label>
        <input
          type="text"
          id="symbol"
          {...register("symbol")}
          className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Basket Symbol (e.g. AIX)"
        />
        {errors.symbol && (
          <p className="mt-1 text-sm text-red-500">{errors.symbol.message}</p>
        )}
      </div>

      <div className="flex mx-auto text-gray-300 space-x-8 items-center my-8">
        <div className="w-full max-w-md rounded-lg shadow p-4 bg-gray-800 border border-gray-700 text-gray-100">
          <div className="mb-2 p-2">
            <label className="block text-sm font-medium text-gray-100 my-2">
              Select Asset
            </label>
            <select
              className="block w-half text-gray-500 rounded-md border-gray-300 shadow-sm bg-gray-200 focus:ring-indigo-500 focus:border-indigo-500 pl-4"
              value={newElement}
              onChange={(e) => setNewElement(e.target.value)}
            >
              <option value="">-- asset --&nbsp;</option>
              {tokens.map((token) => (
                <option key={token.id} value={token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-8 p-2">
            <label className="block text-sm font-medium text-gray-100 my-2">
              Amount
            </label>
            <input
              type="number"
              className="block w-1/4 rounded-md text-gray-500 border-gray-300 shadow-sm bg-gray-200 focus:ring-indigo-500 focus:border-indigo-500 pl-4"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="amt."
            />
          </div>

          <div
            className="w-half bg-indigo-500 text-grey-300 font-medium py-2 px-4 rounded-md hover:bg-indigo-600"
            onClick={handleAddElement}
          >
            Add Asset
          </div>
        </div>

        <div className="w-full max-w-md">
          <ul className="bg-gray-200 rounded-lg shadow divide-y divide-gray-300">
            {selectedElements.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-4 px-8"
              >
                <div>
                  <p className="font-medium text-gray-500">
                    {item.token}&nbsp;&nbsp;&nbsp;
                    <span className="text-md text-green-600">
                      {item.amount}
                    </span>
                  </p>
                </div>
                <div
                  className="text-red-500 hover:underline"
                  onClick={() => handleRemoveElement(index)}
                >
                  <MinusCircleIcon className="size-6" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isSubmitting ? "Creating..." : "Create Crypto Basket"}
      </button>
    </form>
  );
}
