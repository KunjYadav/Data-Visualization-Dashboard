/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

interface RadialBarChartProps {
  data: { name: string; value: number }[];
  title?: string;
}

const SWOT_COLORS: Record<string, string> = {
  Strength: "#10b981",
  Weakness: "#f59e0b",
  Opportunity: "#6366f1",
  Threat: "#ef4444",
};

const SWOT_ORDER = ["Strength", "Weakness", "Opportunity", "Threat"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white dark:bg-slate-900 p-3 border border-slate-200 dark:border-slate-700 shadow-xl rounded-lg'>
        <p className='text-xs font-bold text-slate-800 dark:text-slate-100'>
          {payload[0].payload.name}
        </p>
        <p className='text-xs text-indigo-600 dark:text-indigo-400 font-medium'>
          Count: <span className='font-bold'>{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

/**
 * Custom Legend Content to strictly enforce the SWOT order and styles.
 */
const renderCustomLegend = () => {
  return (
    <ul className='flex flex-col gap-2 ml-6'>
      {SWOT_ORDER.map((name) => (
        <li key={name} className='flex items-center gap-2'>
          <div
            className='w-3 h-3 rounded-full'
            style={{ backgroundColor: SWOT_COLORS[name] }}
          />
          <span className='text-[13px] font-bold text-slate-600 dark:text-slate-400 tracking-tight'>
            {name}
          </span>
        </li>
      ))}
    </ul>
  );
};

const RadialBarChartComponent = ({ data, title }: RadialBarChartProps) => {
  // Ensure the data passed to the chart follows the strict order
  const chartData = useMemo(() => {
    return SWOT_ORDER.map((name) => {
      const item = data.find((d) => d.name === name);
      return {
        name,
        value: item ? item.value : 0,
        fill: SWOT_COLORS[name],
      };
    });
  }, [data]);

  return (
    <div className='bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm w-full h-full min-h-100 transition-colors'>
      {title && (
        <h4 className='font-bold text-slate-800 dark:text-slate-100 mb-6'>
          {title}
        </h4>
      )}
      <div className='h-80 w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <RadialBarChart
            cx='50%'
            cy='50%'
            innerRadius='20%'
            outerRadius='100%'
            barSize={20}
            data={chartData}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              label={{
                position: "insideStart",
                fill: "#fff",
                fontSize: 10,
                fontWeight: "bold",
              }}
              background={{ fill: "var(--background)", opacity: 0.1 }}
              dataKey='value'
              cornerRadius={10}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </RadialBar>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout='vertical'
              verticalAlign='middle'
              align='right'
              content={renderCustomLegend}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RadialBarChartComponent;
