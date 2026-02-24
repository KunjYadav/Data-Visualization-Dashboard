/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUpDown,
  ChevronDown,
  X,
  Search,
  Sun,
  Moon,
} from "lucide-react";

interface FilterSidebarProps {
  filters: any;
  setFilters: (filters: any) => void;
  filterOptions: Record<string, (string | number)[]>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const FilterSidebar = ({
  filters,
  setFilters,
  filterOptions,
  isOpen,
  setIsOpen,
}: FilterSidebarProps) => {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    setIsDark(
      savedTheme === "dark" ||
        document.documentElement.classList.contains("dark"),
    );
  }, []);

  const toggleTheme = () => {
    const newDarkState = !isDark;
    setIsDark(newDarkState);
    if (newDarkState) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const resetFilters = () => {
    setFilters({
      end_year: "",
      topic: "",
      sector: "",
      region: "",
      pestle: "",
      source: "",
      country: "",
      swot: "",
      city: "",
    });
    setSearchQuery("");
  };

  if (!mounted) return null;

  return (
    <>
      {isOpen && (
        <div
          className='fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden'
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-40 transition-all duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className='p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between'>
          <Link href='/' className='flex items-center gap-3'>
            <div className='bg-linear-to-r from-fuchsia-600 to-red-600 p-2 rounded-lg text-white'>
              <LayoutDashboard size={20} />
            </div>
            <span className='font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100'>
              InsightDB
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className='lg:hidden p-1 text-slate-400'
          >
            <X size={20} />
          </button>
        </div>

        <nav className='flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar'>
          <div className='text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2'>
            Navigation
          </div>

          <Link
            href='/'
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === "/" ? "bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-semibold" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
          >
            <LayoutDashboard size={18} /> Overview
          </Link>

          <Link
            href='/explorer'
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === "/explorer" ? "bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-semibold" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
          >
            <TrendingUpDown size={18} /> Data Explorer
          </Link>

          <div className='pt-6 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2 border-t border-slate-100 dark:border-slate-800'>
            Global Filters
          </div>

          <div className='px-2 mb-4'>
            <div className='relative'>
              <Search
                className='absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400'
                size={14}
              />
              <input
                type='text'
                placeholder='Search options...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-8 pr-3 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-xs text-slate-900 dark:text-slate-200 outline-none focus:ring-1 focus:ring-indigo-500'
              />
            </div>
          </div>

          {Object.keys(filters).map((key) => {
            const rawOptions = filterOptions[key] || [];
            const uniqueOptions = Array.from(new Set(rawOptions)).filter(
              (opt) => opt !== "" && opt !== null && opt !== undefined,
            );

            const filteredOptions = uniqueOptions.filter((opt) =>
              String(opt).toLowerCase().includes(searchQuery.toLowerCase()),
            );

            if (
              searchQuery &&
              filteredOptions.length === 0 &&
              !String(filters[key])
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            ) {
              return null;
            }

            return (
              <div key={key} className='px-2 mb-4'>
                <label className='block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter mb-1'>
                  {key.replace("_", " ")}
                </label>
                <div className='relative'>
                  <select
                    className='w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs p-2 appearance-none outline-none text-slate-900 dark:text-slate-300 focus:ring-1 focus:ring-indigo-500'
                    value={filters[key]}
                    onChange={(e) =>
                      setFilters({ ...filters, [key]: e.target.value })
                    }
                  >
                    <option value=''>All {key.replace("_", " ")}s</option>
                    {filteredOptions.map((opt) => (
                      <option key={`${key}-${opt}`} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className='absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400'
                    size={14}
                  />
                </div>
              </div>
            );
          })}
        </nav>

        <div className='p-4 border-t border-slate-100 dark:border-slate-800 space-y-2 bg-white dark:bg-slate-900'>
          <button
            onClick={toggleTheme}
            className='w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all'
          >
            {isDark ? (
              <Sun size={16} className='text-amber-500' />
            ) : (
              <Moon size={16} className='text-indigo-400' />
            )}
            {isDark ? "LIGHT MODE" : "DARK MODE"}
          </button>
          <button
            onClick={resetFilters}
            className='w-full py-2 text-[10px] text-indigo-600 dark:text-indigo-400 font-bold hover:underline uppercase tracking-widest'
          >
            Reset All Filters
          </button>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;
