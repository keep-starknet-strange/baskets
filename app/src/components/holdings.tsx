"use-client";

import { LineChart, Line } from "recharts";

// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

export default function Holdings() {
  const holdings = [
    { name: "Bitcoin", value: 40 },
    { name: "Ethereum", value: 30 },
    { name: "Cardano", value: 10 },
    { name: "Polkadot", value: 10 },
    { name: "Others", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
  const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];

  return (
    <div className="border-b border-gray-200 px-4 py-5 sm:px-6 m-10 text-card-foreground p-4 rounded-lg border border-border">
      <h3 className="text-base font-semibold">Fund Holdings</h3>
      <p className="mt-1 text-sm text-gray-500">Current asset allocation</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          table test
        </div>
      </div>
    </div>
  );
}
