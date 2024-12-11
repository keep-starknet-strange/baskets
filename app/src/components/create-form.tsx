"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import {} from // useSendTransaction,
// useContract,
// useAccount,
// useNetwork,
"@starknet-react/core";
// import { basketsAbi } from "@/lib/data/basketsAbi";
// import { erc20Abi } from "@/lib/data/erc20Abi";

// const BASKETS_ADDRESS =
//   "0x041db2adf4e1b06a3122b33ab4bb6601c10a9e84bd32099c354578a038c42446";

// const pools = [
//   {
//     id: 1,
//     address:
//       "0x06ed884263e9bb21cb571e02d89aa1dd8772f8a95a52bd9c685f3d0e8967054a",
//     name: "STRK/USDC",
//   },
//   {
//     id: 2,
//     address:
//       "0x03c06d89aa10f5ce18182aac4b821d3b0c3edd3b9a9ad505952b3b386029b6c2",
//     name: "ETH/USDC",
//   },
// ];

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
  commission: z.number().min(0).max(100, {
    message: "Commission must be between 0 and 100.",
  }),
});

interface SelectedElement {
  address: string;
  amount: number;
}

type FormSchemaType = z.infer<typeof formSchema>;

export default function CryptoBasketForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newElement, setNewElement] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  // const { address } = useAccount();
  // const { chain } = useNetwork();
  const [selectedElements, setSelectedElements] = useState<SelectedElement[]>(
    [],
  );
  // const { contract } = useContract({
  //   abi: erc20Abi,
  //   address: chain.nativeCurrency.address,
  // });

  const handleAddElement = () => {
    if (newElement && amount) {
      setSelectedElements([
        ...selectedElements,
        { address: newElement, amount: Number(amount) },
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
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symbol: "",
      commission: 0,
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = () => {
    setIsSubmitting(true);
    // const { send, error } = useSendTransaction({
    //   calls:
    //     contract && address
    //       ? [contract.populate("transfer", [address, 1])]
    //       : undefined,
    // });
    // console.log("SEND: ", send);
    // console.log("ERROR: ", error);
    reset();
    alert("Basket created successfully!");
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

      <div>
        <label
          htmlFor="commission"
          className="block text-sm font-medium text-gray-300"
        >
          Commission (%)
        </label>
        <input
          type="number"
          id="commission"
          {...register("commission", { valueAsNumber: true })}
          step="0.01"
          min="0"
          max="100"
          className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.commission && (
          <p className="mt-1 text-sm text-red-500">
            {errors.commission.message}
          </p>
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
                    {item.address}&nbsp;&nbsp;&nbsp;
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
