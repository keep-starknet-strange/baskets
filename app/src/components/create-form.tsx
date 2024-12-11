"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AddToken from "@/components/add-token";

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

type FormSchemaType = z.infer<typeof formSchema>;

export default function CryptoBasketForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

      <div className="mx-auto">
        <AddToken />
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
