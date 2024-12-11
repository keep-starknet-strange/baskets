"use client";

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function Holdings() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  const holdings = [
    { name: "Bitcoin", value: 40 },
    { name: "Ethereum", value: 30 },
    { name: "Cardano", value: 10 },
    { name: "Polkadot", value: 10 },
    { name: "Others", value: 10 },
  ];

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      if (ctx) {
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: holdings.map(holding => holding.name),
            datasets: [{
              data: holdings.map(holding => holding.value),
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF'
              ],
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'right',
              },
            }
          }
        });
      }
    }
  }, []);

  return (
    <div className="border-b border-gray-200 px-4 py-5 sm:px-6 m-10 text-card-foreground p-4 rounded-lg border border-border">
      <h3 className="text-base font-semibold">Fund Holdings</h3>
      <p className="mt-1 text-sm text-gray-500">Current asset allocation</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="w-[400px] h-[400px]">
          <canvas ref={chartRef}></canvas>
        </div>
        <div className="space-y-4">
          {holdings.map((holding, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'][index] }}
                ></div>
                <span className="font-medium">{holding.name}</span>
              </div>
              <span className="text-gray-600">{holding.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
