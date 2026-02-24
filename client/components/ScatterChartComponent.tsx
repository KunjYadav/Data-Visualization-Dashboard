/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Legend,
  Cell,
  ReferenceLine,
} from "recharts";

interface ScatterChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  zKey?: string;
  categoryKey?: string;
  xLabel?: string;
  yLabel?: string;
  title?: string;
}

const COLORS = [
  "#6366f1", // Indigo
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#ef4444", // Rose
  "#8b5cf6", // Violet
  "#ec4899", // Pink
  "#06b6d4", // Cyan
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className='bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-xl max-w-xs'>
        <p className='text-[10px] font-bold text-indigo-500 uppercase mb-1'>
          {data.sector || "General"}
        </p>
        <p className='text-xs font-bold text-slate-800 dark:text-slate-100 mb-2 line-clamp-2'>
          {data.insight}
        </p>
        <div className='grid grid-cols-2 gap-2 border-t border-slate-100 dark:border-slate-800 pt-2'>
          <div>
            <p className='text-[10px] text-slate-400'>Intensity</p>
            <p className='text-sm font-bold text-slate-700 dark:text-slate-300'>
              {data.intensity}
            </p>
          </div>
          <div>
            <p className='text-[10px] text-slate-400'>Relevance</p>
            <p className='text-sm font-bold text-slate-700 dark:text-slate-300'>
              {data.relevance}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const ScatterChartComponent = ({
  data,
  xKey,
  yKey,
  zKey,
  categoryKey,
  xLabel,
  yLabel,
  title,
}: ScatterChartProps) => {
  // Group data by category (e.g., Sector) for the legend and color coding
  const groupedData = React.useMemo(() => {
    if (!categoryKey) return [{ name: "Insights", items: data }];

    const groups: Record<string, any[]> = {};
    data.forEach((item) => {
      const cat = item[categoryKey] || "Other";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });

    return Object.entries(groups).map(([name, items]) => ({ name, items }));
  }, [data, categoryKey]);

  return (
    <div className='bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm w-full h-full min-h-100 transition-all duration-300'>
      <div className='flex items-center justify-between mb-6'>
        {title && (
          <h4 className='font-bold text-slate-800 dark:text-slate-100'>
            {title}
          </h4>
        )}
        <div className='text-[10px] font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md'>
          N = {data.length}
        </div>
      </div>

      <div className='h-96 w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid
              strokeDasharray='3 3'
              stroke='currentColor'
              className='text-slate-100 dark:text-slate-800/50'
              vertical={true}
            />
            <XAxis
              type='number'
              dataKey={xKey}
              name={xLabel || xKey}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              label={{
                value: xLabel,
                position: "insideBottomRight",
                offset: -10,
                fontSize: 10,
                fill: "#94a3b8",
              }}
            />
            <YAxis
              type='number'
              dataKey={yKey}
              name={yLabel || yKey}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              label={{
                value: yLabel,
                angle: -90,
                position: "insideLeft",
                fontSize: 10,
                fill: "#94a3b8",
              }}
            />
            {zKey && <ZAxis type='number' dataKey={zKey} range={[50, 400]} />}

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ strokeDasharray: "3 3", stroke: "#6366f1" }}
            />

            <Legend
              verticalAlign='top'
              align='right'
              iconType='circle'
              wrapperStyle={{ paddingBottom: "20px" }}
              formatter={(value) => (
                <span className='text-[11px] font-semibold text-slate-500 dark:text-slate-400 ml-1'>
                  {value}
                </span>
              )}
            />

            {/* Logical Baseline: Average Relevance often sits around 3-4 */}
            <ReferenceLine
              y={3}
              stroke='#94a3b8'
              strokeDasharray='3 3'
              label={{
                value: "Rel Baseline",
                position: "insideTopLeft",
                fill: "#94a3b8",
                fontSize: 9,
              }}
            />

            {groupedData.map((group, index) => (
              <Scatter
                key={group.name}
                name={group.name}
                data={group.items}
                fill={COLORS[index % COLORS.length]}
                className='cursor-crosshair transition-all duration-500'
              >
                {group.items.map((entry, i) => (
                  <Cell
                    key={`cell-${i}`}
                    fill={COLORS[index % COLORS.length]}
                    fillOpacity={0.6}
                    stroke={COLORS[index % COLORS.length]}
                    strokeWidth={1}
                  />
                ))}
              </Scatter>
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScatterChartComponent;
