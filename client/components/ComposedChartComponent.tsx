/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
} from "recharts";

interface ComposedChartProps {
  data: any[];
  xKey: string;
  barKey: string;
  lineKey: string;
  barName?: string;
  lineName?: string;
  barColor?: string;
  lineColor?: string;
  hoverColor?: string;
  title?: string;
  horizontal?: boolean;
}

const ComposedChartComponent = ({
  data,
  xKey,
  barKey,
  lineKey,
  barName = "Count",
  lineName = "Intensity",
  barColor = "#6366f1",
  lineColor = "#ec4899",
  hoverColor = "#4f46e5",
  title,
  horizontal = false,
}: ComposedChartProps) => {
  return (
    <div className='bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm w-full h-full min-h-100 transition-colors'>
      {title && (
        <h4 className='font-bold text-slate-800 dark:text-slate-100 mb-6'>
          {title}
        </h4>
      )}
      <div className='h-80 w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <ComposedChart
            layout={horizontal ? "vertical" : "horizontal"}
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              vertical={horizontal}
              horizontal={!horizontal}
              stroke='currentColor'
              className='text-slate-200 dark:text-slate-800'
            />

            {/* Axis Swap Logic */}
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
              contentStyle={{
                backgroundColor: "var(--background)",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                color: "var(--foreground)",
              }}
            />
            <Legend
              verticalAlign='bottom'
              iconType='circle'
              formatter={(value) => (
                <span className='text-[13px] font-medium text-slate-600 dark:text-slate-400 ml-1'>
                  {value}
                </span>
              )}
            />

            <Bar
              dataKey={barKey}
              name={barName}
              fill={barColor}
              radius={horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}
              barSize={20}
              activeBar={<Rectangle fill={hoverColor} />}
            />
            <Line
              type='monotone'
              dataKey={lineKey}
              name={lineName}
              stroke={lineColor}
              strokeWidth={3}
              dot={{ r: 4, fill: lineColor, strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComposedChartComponent;
