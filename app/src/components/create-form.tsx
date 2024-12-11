"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";

const people = [
  { id: 1, name: "STRK/USDC" },
  { id: 2, name: "ETH/USDC" },
  { id: 3, name: "WBTC/USDC" },
  { id: 4, name: "EKUBO/USDC" },
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  symbol: z.string().min(2, {
    message: "All upper case.",
  }),
  assets: z.string().min(10, {
    message: "Asset allocations.",
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
  const [selected, setSelected] = useState(people[3]);

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
      assets: "",
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

      <div>
        <label
          htmlFor="Assets"
          className="block text-sm font-medium text-gray-300"
        >
          Assets
        </label>
        <Listbox value={selected} onChange={setSelected}>
          <Label className="block text-sm/6 font-medium text-gray-900">
            Assigned to
          </Label>
          <div className="relative">
            <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-slate-300 py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
              <span className="col-start-1 row-start-1 truncate pr-6">
                {selected.name}
              </span>
              <ChevronUpDownIcon
                aria-hidden="true"
                className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
            </ListboxButton>

            <ListboxOptions
              transition
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-300 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
            >
              {people.map((person) => (
                <ListboxOption
                  key={person.id}
                  value={person}
                  className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
                >
                  <span className="block truncate font-normal group-data-[selected]:font-semibold">
                    {person.name}
                  </span>

                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                    <CheckIcon aria-hidden="true" className="size-5" />
                  </span>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
        {errors.assets && (
          <p className="mt-1 text-sm text-red-500">{errors.assets.message}</p>
        )}
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
