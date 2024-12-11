import { useState } from "react";

interface SelectedElement {
  name: string;
  percentage: number;
}

export default function AddToken() {
  const [newElement, setNewElement] = useState<string>("");
  const [percentage, setPercentage] = useState<string>("");
  const [selectedElements, setSelectedElements] = useState<SelectedElement[]>(
    [],
  );

  const handleAddElement = () => {
    if (newElement && percentage) {
      setSelectedElements([
        ...selectedElements,
        { name: newElement, percentage: Number(percentage) },
      ]);
      setNewElement("");
      setPercentage("");
    }
  };

  const handleRemoveElement = (index: number) => {
    setSelectedElements(selectedElements.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto text-gray-300">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Asset
          </label>
          <select
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={newElement}
            onChange={(e) => setNewElement(e.target.value)}
          >
            <option value="">-- Choose an asset pair --</option>
            <option value="STRK/USDC">STRK/USDC</option>
            <option value="ETH/USDC">ETH/USDC</option>
            <option value="WBTC/USDC">WBTC/USDC</option>
            <option value="EKUBO/USDC">EKUBO/USDC</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Percentage
          </label>
          <input
            type="number"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            placeholder="Enter percentage"
          />
        </div>

        <button
          className="w-full bg-indigo-500 text-grey-300 font-medium py-2 px-4 rounded-md hover:bg-indigo-600"
          onClick={handleAddElement}
        >
          Add Asset
        </button>
      </div>

      <div className="w-full max-w-md mt-6">
        <h2 className="text-xl font-bold mb-2">Basket</h2>
        <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
          {selectedElements.map((item, index) => (
            <li key={index} className="flex justify-between items-center p-4">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{item.percentage}%</p>
              </div>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleRemoveElement(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
