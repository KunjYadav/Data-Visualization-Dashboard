/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Download,
  FileText,
  ExternalLink,
} from "lucide-react";

interface DataTableProps {
  data: any[];
}

const DataTable = ({ data }: DataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const tableRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 10;

  const searchedData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [data, searchTerm]);

  const totalPages = Math.ceil(searchedData.length / itemsPerPage);
  const paginatedData = searchedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const exportToCSV = () => {
    if (searchedData.length === 0) return;
    const headers = [
      "Topic",
      "Insight",
      "Sector",
      "Intensity",
      "Likelihood",
      "Source",
      "URL",
    ];
    const csvRows = searchedData.map((item) => [
      `"${(item.topic || "General").replace(/"/g, '""')}"`,
      `"${(item.insight || "").replace(/"/g, '""')}"`,
      `"${(item.sector || "N/A").replace(/"/g, '""')}"`,
      item.intensity,
      item.likelihood,
      `"${(item.source || "").replace(/"/g, '""')}"`,
      `"${(item.url || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent = [
      headers.join(","),
      ...csvRows.map((row) => row.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `insight_export_${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    window.print();
  };

  return (
    <div className='bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-300'>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-table,
          #printable-table * {
            visibility: visible;
          }
          #printable-table {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className='p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
        <div>
          <h4 className='font-bold text-slate-800 dark:text-slate-100'>
            Insight Data Explorer
          </h4>
          <span className='text-xs text-slate-500 dark:text-slate-400'>
            Showing {paginatedData.length} of {searchedData.length} records
          </span>
        </div>

        <div className='flex flex-wrap items-center gap-2'>
          <button
            onClick={exportToCSV}
            className='flex items-center gap-2 px-3 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-xl border border-indigo-100 dark:border-indigo-800/50 hover:bg-indigo-100 transition-all active:scale-95'
          >
            <Download size={14} />
            CSV
          </button>

          <button
            onClick={exportToPDF}
            className='flex items-center gap-2 px-3 py-2 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-xs font-bold rounded-xl border border-rose-100 dark:border-rose-800/50 hover:bg-rose-100 transition-all active:scale-95'
          >
            <FileText size={14} />
            PDF
          </button>

          <div className='relative ml-1'>
            <Search
              className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'
              size={14}
            />
            <input
              type='text'
              placeholder='Search table...'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className='pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none w-full sm:w-48'
            />
          </div>
        </div>
      </div>

      <div id='printable-table' ref={tableRef} className='overflow-x-auto'>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr className='bg-slate-50 dark:bg-slate-800/50 text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold'>
              <th className='px-6 py-4'>Topic</th>
              <th className='px-6 py-4'>Insight</th>
              <th className='px-6 py-4'>Sector</th>
              <th className='px-6 py-4 text-center'>Likelihood</th>
              <th className='px-6 py-4 text-center'>Link</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-100 dark:divide-slate-800'>
            {paginatedData.map((item, i) => (
              <tr
                key={i}
                className='hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors'
              >
                <td className='px-6 py-4'>
                  <span className='text-xs font-semibold px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-md capitalize'>
                    {item.topic || "General"}
                  </span>
                </td>
                <td className='px-6 py-4'>
                  <p className='text-sm font-medium text-slate-800 dark:text-slate-200 line-clamp-1'>
                    {item.insight}
                  </p>
                  <p className='text-[10px] text-slate-400 dark:text-slate-500 truncate'>
                    {item.source}
                  </p>
                </td>
                <td className='px-6 py-4 text-xs text-slate-600 dark:text-slate-400'>
                  {item.sector || "N/A"}
                </td>
                <td className='px-6 py-4 text-center'>
                  <div className='flex items-center justify-center gap-1'>
                    {[...Array(5)].map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full ${
                          idx < item.likelihood
                            ? "bg-emerald-500"
                            : "bg-slate-200 dark:bg-slate-700"
                        }`}
                      ></div>
                    ))}
                  </div>
                </td>
                <td className='px-6 py-4 text-center'>
                  {item.url ? (
                    <a
                      href={item.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center justify-center p-2 bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all active:scale-90'
                      title='View Original Source'
                    >
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <span className='text-slate-300 dark:text-slate-700'>
                      <ExternalLink size={14} />
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30 no-print'>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className='p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 disabled:opacity-30 transition-all'
        >
          <ChevronLeft size={18} />
        </button>
        <div className='flex items-center gap-2'>
          <span className='text-xs font-medium text-slate-600 dark:text-slate-400'>
            Page {currentPage} of {totalPages || 1}
          </span>
        </div>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className='p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 disabled:opacity-30 transition-all'
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default DataTable;
