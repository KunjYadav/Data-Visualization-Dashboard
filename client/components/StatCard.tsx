import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  bg: string;
}

const StatCard = ({ label, value, icon, bg }: StatCardProps) => (
  <div className='bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between transition-all hover:-translate-y-1 cursor-default'>
    <div>
      <p className='text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1'>
        {label}
      </p>
      <h3 className='text-2xl font-bold dark:text-slate-100'>{value}</h3>
    </div>
    <div className={`${bg} text-white p-3 rounded-2xl shadow-lg`}>{icon}</div>
  </div>
);

export default StatCard;
