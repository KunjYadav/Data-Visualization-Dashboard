"use client";

import React from "react";
import { Menu } from "lucide-react";
import FilterSidebar from "./FilterSidebar";
import { DashboardProvider, useDashboard } from "@/context/DashboardContext";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const {
    filters,
    setFilters,
    filterOptions,
    isSidebarOpen,
    setIsSidebarOpen,
  } = useDashboard();

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300'>
      {/* Mobile Header Bar */}
      <header className='lg:hidden sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800'>
        <div className='flex items-center gap-2'>
          <div className='bg-linear-to-r from-fuchsia-600 to-red-600 p-1.5 rounded-lg text-white'>
            <span className='font-bold text-xs'>IDB</span>
          </div>
          <span className='font-bold text-slate-800 dark:text-slate-100'>
            InsightDB
          </span>
        </div>

        <button
          onClick={() => setIsSidebarOpen(true)}
          className='p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 active:scale-95 transition-all'
          aria-label='Open Menu'
        >
          <Menu size={20} />
        </button>
      </header>

      <FilterSidebar
        filters={filters}
        setFilters={setFilters}
        filterOptions={filterOptions}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <main className='lg:ml-64 p-4 md:p-6 lg:p-8 transition-all duration-300'>
        <div className='max-w-7xl mx-auto'>{children}</div>
      </main>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <LayoutContent>{children}</LayoutContent>
    </DashboardProvider>
  );
}
