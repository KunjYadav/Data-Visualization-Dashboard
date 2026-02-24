/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface LineKey {
  key: string;
  name: string;
  color: string;
}

interface LineChartProps {
  data: any[];
  xKey: string;
  dataKeys: LineKey[];
  title?: string;
}

const LineChartComponent = ({
  data,
  xKey,
  dataKeys,
  title,
}: LineChartProps) => {
  return (
    <div className='bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm w-full h-full min-h-100 transition-colors'>
      {title && (
        <h4 className='font-bold text-slate-800 dark:text-slate-100 mb-6'>
          {title}
        </h4>
      )}
      <div className='h-80 w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              vertical={false}
              stroke='currentColor'
              className='text-slate-200 dark:text-slate-800'
            />
            <XAxis
              dataKey={xKey}
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={true}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={true}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--background)",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                color: "var(--foreground)",
              }}
            />
            <Legend
              verticalAlign='bottom'
              iconType='line'
              formatter={(value) => (
                <span className='text-[13px] font-medium text-slate-600 dark:text-slate-400 ml-1'>
                  {value}
                </span>
              )}
            />
            {dataKeys.map((item) => (
              <Line
                key={item.key}
                type='monotone'
                dataKey={item.key}
                name={item.name}
                stroke={item.color}
                strokeWidth={3}
                dot={{ r: 4, fill: item.color, strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComponent;
