/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";

interface BarChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  color?: string;
  hoverColor?: string;
  title?: string;
  horizontal?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white dark:bg-slate-900 p-3 border border-slate-200 dark:border-slate-700 shadow-xl rounded-lg'>
        <p className='text-xs font-bold text-slate-800 dark:text-slate-100 mb-1'>
          {label}
        </p>
        <p className='text-xs text-indigo-600 dark:text-indigo-400 font-medium'>
          {payload[0].name}:{" "}
          <span className='font-bold'>{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const BarChartComponent = ({
  data,
  xKey,
  yKey,
  color = "#6366f1",
  hoverColor = "#4f46e5",
  title,
  horizontal = false,
}: BarChartProps) => {
  return (
    <div className='bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm w-full h-full min-h-100 transition-all hover:shadow-md'>
      {title && (
        <h4 className='font-bold text-slate-800 dark:text-slate-100 mb-6'>
          {title}
        </h4>
      )}
      <div className='h-80 w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={data}
            layout={horizontal ? "vertical" : "horizontal"}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              vertical={horizontal} // Show vertical lines if bars are horizontal
              horizontal={!horizontal}
              stroke='currentColor'
              className='text-slate-200 dark:text-slate-800'
            />

            {/* Logic swap: If horizontal, XAxis becomes the value, YAxis becomes the category */}
            <XAxis
              type={horizontal ? "number" : "category"}
              dataKey={horizontal ? undefined : xKey}
              tick={{ fontSize: 10, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type={horizontal ? "category" : "number"}
              dataKey={horizontal ? xKey : undefined}
              tick={{ fontSize: 10, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              width={horizontal ? 100 : 30}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(100, 116, 139, 0.05)" }}
            />
            <Bar
              dataKey={yKey}
              fill={color}
              radius={horizontal ? [0, 6, 6, 0] : [6, 6, 0, 0]}
              barSize={20}
              className='cursor-pointer'
              activeBar={<Rectangle fill={hoverColor} stroke={hoverColor} />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartComponent;
