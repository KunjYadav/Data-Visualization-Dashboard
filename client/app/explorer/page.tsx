"use client";

import React from "react";
import { Menu } from "lucide-react";
import DataTable from "@/components/DataTable";
import DashboardLayout from "@/components/DashboardLayout";
import { useDashboard } from "@/context/DashboardContext";

const ExplorerContent = () => {
  const { filteredData, loading, setIsSidebarOpen } = useDashboard();

  if (loading)
    return (
      <div className='flex h-screen flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-950'>
        <div className='w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin'></div>
        <p className='font-medium text-slate-500 dark:text-slate-400 animate-pulse'>
          Loading Data Explorer...
        </p>
      </div>
    );

  return (
    <div className='p-4 lg:p-8'>
      <header className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-bold text-slate-800 dark:text-slate-100'>
            Data Explorer
          </h1>
          <p className='text-slate-500 dark:text-slate-400 text-sm'>
            Filter and search through individual records
          </p>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className='lg:hidden p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm text-slate-600 dark:text-slate-400'
        >
          <Menu size={24} />
        </button>
      </header>

      <DataTable data={filteredData} />
    </div>
  );
};

export default function ExplorerPage() {
  return (
    <DashboardLayout>
      <ExplorerContent />
    </DashboardLayout>
  );
}
