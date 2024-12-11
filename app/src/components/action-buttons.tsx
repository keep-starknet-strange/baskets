import { PlusCircle, MinusCircle } from "lucide-react";

export default function ActionButtons() {
  return (
    <div className="flex justify-center space-x-4">
      <a
        href="#"
        className="flex rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {" "}
        <PlusCircle className="mr-2 h-4 w-4" />
        Deposit
      </a>
      <a
        href="#"
        className="flex rounded-md bg-rose-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {" "}
        <MinusCircle className="mr-2 h-4 w-4" />
        Withdraw
      </a>
    </div>
  );
}
