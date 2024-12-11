"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MinusCircleIcon } from "@heroicons/react/24/outline";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  symbol: z.string().min(2, {
    message: "All upper case.",
  }),
  commission: z.number().min(0).max(100, {
    message: "Commission must be between 0 and 100.",
  }),
  timelock: z.number().int().positive({
    message: "Timelock must be a positive integer.",
  }),
});

interface SelectedElement {
  name: string;
  percentage: number;
}

type FormSchemaType = z.infer<typeof formSchema>;

export default function CryptoBasketForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newElement, setNewElement] = useState<string>("");
  const [percentage, setPercentage] = useState<string>("");
  const [aggPercentage, setAggPercentage] = useState<number>(0);
  const [selectedElements, setSelectedElements] = useState<SelectedElement[]>(
    [],
  );

  const handleAddElement = () => {
    if (newElement && percentage) {
      const basketAllocation = +percentage + aggPercentage;
      if (basketAllocation > 100) {
        console.log("can't allocate more than 100%");
      } else {
        setSelectedElements([
          ...selectedElements,
          { name: newElement, percentage: Number(percentage) },
        ]);
        setNewElement("");
        setPercentage("");
        setAggPercentage(basketAllocation);
      }
    }
  };

  const handleRemoveElement = (index: number) => {
    const basketAllocation = aggPercentage - +percentage;
    setAggPercentage(basketAllocation);
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
      name: "",
      symbol: "",
      commission: 0,
      timelock: 1,
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = () => {
    setIsSubmitting(true);
    // Here you would typically send the form data to your backend
    setTimeout(() => {
      setIsSubmitting(false);
      reset();
      alert("Crypto basket created successfully!");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mx-6 lg:mx-20">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-300"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="My Awesome Crypto Basket"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

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
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
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

      <div>
        <label
          htmlFor="timelock"
          className="block text-sm font-medium text-gray-300"
        >
          Timelock (days)
        </label>
        <input
          type="number"
          id="timelock"
          {...register("timelock", { valueAsNumber: true })}
          min="1"
          className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.timelock && (
          <p className="mt-1 text-sm text-red-500">{errors.timelock.message}</p>
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
            <option value="">-- Choose an asset pair --</option>
            <option value="STRK">STRK</option>
            <option value="ETH">ETH</option>
            <option value="WBTC">WBTC</option>
            <option value="EKUBO">EKUBO</option>
          </select>
        </div>

        <div className="mb-8 p-2">
          <label className="block text-sm font-medium text-gray-100 my-2">
            Percentage (tot. {aggPercentage}%)
          </label>
          <input
            type="number"
            className="block w-1/4 rounded-md text-gray-500 border-gray-300 shadow-sm bg-gray-200 focus:ring-indigo-500 focus:border-indigo-500 pl-4"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            placeholder="%"
          />
        </div>

        <button
          className="w-full bg-indigo-500 text-grey-300 font-medium py-2 px-4 rounded-md hover:bg-indigo-600"
          onClick={handleAddElement}
        >
          Add Asset
        </button>
      </div>

      <div className="w-full max-w-md">
        <ul className="bg-gray-200 rounded-lg shadow divide-y divide-gray-300">
          {selectedElements.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center py-4 px-8"
            >
              <div>
                <p className="font-medium text-gray-500">{item.name}</p>
                <p className="text-sm text-green-500">{item.percentage}%</p>
              </div>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleRemoveElement(index)}
              >
                <MinusCircleIcon className="size-6" />
              </button>
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
