/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import axios from "axios";

interface DashboardContextType {
  data: any[];
  filteredData: any[];
  loading: boolean;
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  filterOptions: Record<string, (string | number)[]>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

const getCityProxy = (country: string, region: string) => {
  const c = (country || "").toLowerCase();
  const r = (region || "").toLowerCase();

  if (c === "united states of america") return "New York / DC";
  if (c === "mexico") return "Mexico City";
  if (c === "china") return "Shanghai / Beijing";
  if (c === "india") return "Mumbai / Delhi";
  if (c === "russia") return "Moscow";
  if (c === "saudi arabia") return "Riyadh";
  if (c === "brazil") return "São Paulo";
  if (r === "europe") return "London / Paris / Berlin";
  if (r === "western africa") return "Lagos";
  if (r === "south america") return "Buenos Aires";
  if (r === "oceania") return "Sydney / Melbourne";

  return country || region || "Global Hub";
};

/**
 * Enhanced SWOT Classification Logic
 */
const classifySWOT = (item: any) => {
  const likelihood = Number(item.likelihood) || 0;
  const intensity = Number(item.intensity) || 0;

  if (likelihood >= 3) {
    return intensity >= 12 ? "Strength" : "Opportunity";
  } else {
    return intensity >= 12 ? "Threat" : "Weakness";
  }
};

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use environment variable with fallback for local development
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const response = await axios.get(`${apiUrl}/api/data`);

        const enrichedData = response.data.map((item: any) => ({
          ...item,
          swot: classifySWOT(item),
          city: getCityProxy(item.country, item.region),
          url: item.url || "#",
        }));
        setData(enrichedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filterOptions = useMemo(() => {
    const options: Record<string, (string | number)[]> = {};
    const keys = [
      "end_year",
      "topic",
      "sector",
      "region",
      "pestle",
      "source",
      "country",
      "swot",
      "city",
    ];
    keys.forEach((key) => {
      options[key] = [
        ...new Set(
          data
            .map((item) => item[key])
            .filter((val) => val !== "" && val !== null),
        ),
      ].sort();
    });
    return options;
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.entries(filters).every(
        ([key, value]) => !value || String(item[key]) === String(value),
      ),
    );
  }, [filters, data]);

  return (
    <DashboardContext.Provider
      value={{
        data,
        filteredData,
        loading,
        filters,
        setFilters,
        filterOptions,
        isSidebarOpen,
        setIsSidebarOpen,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
