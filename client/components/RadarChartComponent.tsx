/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface RadarChartProps {
  data: any[];
  angleKey: string;
  dataKeys: { key: string; name: string; color: string }[];
  title?: string;
}

const RadarChartComponent = ({
  data,
  angleKey,
  dataKeys,
  title,
}: RadarChartProps) => {
  return (
    <div className='bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm w-full h-full min-h-100 transition-colors'>
      {title && (
        <h4 className='font-bold text-slate-800 dark:text-slate-100 mb-2'>
          {title}
        </h4>
      )}
      <div className='h-80 w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <RadarChart cx='50%' cy='50%' outerRadius='80%' data={data}>
            <PolarGrid
              stroke='currentColor'
              className='text-slate-200 dark:text-slate-800'
            />
            <PolarAngleAxis
              dataKey={angleKey}
              tick={{ fontSize: 10, fill: "#64748b" }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />
            {dataKeys.map((item) => (
              <Radar
                key={item.key}
                name={item.name}
                dataKey={item.key}
                stroke={item.color}
                fill={item.color}
                fillOpacity={0.5}
                activeDot={{ r: 6, strokeWidth: 0 }}
                className='transition-all duration-300 hover:fill-opacity-70'
              />
            ))}
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--background)",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                color: "var(--foreground)",
              }}
              itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
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
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RadarChartComponent;
