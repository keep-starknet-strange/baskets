import { useState } from "react";
import { MinusCircleIcon } from "@heroicons/react/24/outline";

interface SelectedElement {
  name: string;
  percentage: number;
}

export default function AddToken() {
  const [newElement, setNewElement] = useState<string>("");
  const [percentage, setPercentage] = useState<string>("");
  const [aggPercentage, setAggPercentage] = useState<number>(0);
  const [selectedElements, setSelectedElements] = useState<SelectedElement[]>(
    [],
  );

  const handleAddElement = () => {
    if (newElement && percentage) {
      let basketAllocation = +percentage + aggPercentage;
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
    let basketAllocation = aggPercentage - +percentage;
    setAggPercentage(basketAllocation);
    setSelectedElements(selectedElements.filter((_, i) => i !== index));
  };

  return (
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
  );
}
