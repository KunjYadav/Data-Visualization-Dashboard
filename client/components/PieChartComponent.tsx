/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Sector,
} from "recharts";

interface PieChartProps {
  data: { name: string; value: number }[];
  title?: string;
  colors?: string[];
  innerRadius?: number;
}

const DEFAULT_COLORS = [
  "#6366f1", // Indigo
  "#06b6d4", // Cyan
  "#8b5cf6", // Violet
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#94a3b8", // Slate (Reference color for 'Others')
];

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
    props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const PieChartComponent = ({
  data,
  title,
  colors = DEFAULT_COLORS,
  innerRadius = 60,
}: PieChartProps) => {
  // Fix: Default to 0 or use a specific number type to satisfy Recharts TS definitions
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  return (
    <div className='bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm w-full h-full min-h-100 transition-colors duration-300'>
      {title && (
        <h4 className='font-bold text-slate-800 dark:text-slate-100 mb-4'>
          {title}
        </h4>
      )}
      <div className='h-80 w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx='50%'
              cy='50%'
              innerRadius={innerRadius}
              outerRadius={90}
              paddingAngle={2}
              dataKey='value'
              stroke='none'
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              className='cursor-pointer'
            >
              {data.map((entry, index) => {
                const isOther = entry.name === "Others";
                const fillColor = isOther
                  ? "#94a3b8"
                  : colors[index % (colors.length - 1)];

                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={fillColor}
                    style={{ outline: "none" }}
                  />
                );
              })}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--background)",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                color: "var(--foreground)",
              }}
              itemStyle={{ color: "var(--foreground)" }}
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
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartComponent;
