/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import {
  TrendingUp,
  Activity,
  Layers,
  Database,
  Menu,
  XCircle,
  PieChart as PieChartIcon,
  Globe2,
  Zap,
  HandHeart,
} from "lucide-react";
import StatCard from "../../components/StatCard";
import BarChartComponent from "../../components/BarChartComponent";
import LineChartComponent from "../../components/LineChartComponent";
import PieChartComponent from "../../components/PieChartComponent";
import RadarChartComponent from "../../components/RadarChartComponent";
import ScatterChartComponent from "../../components/ScatterChartComponent";
import ComposedChartComponent from "../../components/ComposedChartComponent";
import RadialBarChartComponent from "../../components/RadialBarChartComponent";
import DashboardLayout from "@/components/DashboardLayout";
import { useDashboard } from "@/context/DashboardContext";

const DashboardSkeleton = () => (
  <div className='animate-pulse p-4 lg:p-8'>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className='h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl'
        ></div>
      ))}
    </div>
    <div className='h-12 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl mb-8'></div>
    <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className='h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl'
        ></div>
      ))}
    </div>
  </div>
);

const DashboardContent = () => {
  const { filteredData, loading, filters, setFilters, setIsSidebarOpen } =
    useDashboard();

  const [activeTab, setActiveTab] = useState("trends");

  const colors = {
    primary: "#6366f1",
    secondary: "#06b6d4",
    info: "#8b5cf6",
    success: "#10b981",
    warning: "#f59e0b",
    accent: "#f43f5e",
  };

  const hasActiveFilters = Object.values(filters || {}).some((v) => v !== "");

  // --- Data Calculations ---
  const cityData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredData.forEach((d: any) => {
      if (d.city) counts[d.city] = (counts[d.city] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, [filteredData]);

  const swotData = useMemo(() => {
    const counts: Record<string, number> = {
      Strength: 0,
      Weakness: 0,
      Opportunity: 0,
      Threat: 0,
    };

    if (filteredData && filteredData.length > 0) {
      filteredData.forEach((d: any) => {
        const s = d.swot;
        if (s && Object.prototype.hasOwnProperty.call(counts, s)) {
          counts[s] += 1;
        }
      });
    }

    return [
      { name: "Strength", value: counts.Strength },
      { name: "Weakness", value: counts.Weakness },
      { name: "Opportunity", value: counts.Opportunity },
      { name: "Threat", value: counts.Threat },
    ];
  }, [filteredData]);

  const sectorData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredData.forEach((d: any) => {
      counts[d.sector || "Unknown"] = (counts[d.sector || "Unknown"] || 0) + 1;
    });

    const sorted = Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Grouping logic: Top 5 + Others
    const topSectors = sorted.slice(0, 5);
    const othersValue = sorted
      .slice(5)
      .reduce((acc, curr) => acc + curr.value, 0);

    if (othersValue > 0) {
      topSectors.push({ name: "Others", value: othersValue });
    }

    return topSectors;
  }, [filteredData]);

  const pestleData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredData.forEach((d: any) => {
      const p = d.pestle || "General";
      counts[p] = (counts[p] || 0) + 1;
    });

    const sorted = Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Grouping logic: Top 5 + Others
    const topPestle = sorted.slice(0, 5);
    const othersValue = sorted
      .slice(5)
      .reduce((acc, curr) => acc + curr.value, 0);

    if (othersValue > 0) {
      topPestle.push({ name: "Others", value: othersValue });
    }

    return topPestle;
  }, [filteredData]);

  const regionComposedData = useMemo(() => {
    const regions: Record<string, { count: number; totalIntensity: number }> =
      {};
    filteredData.forEach((d: any) => {
      if (d.region) {
        if (!regions[d.region])
          regions[d.region] = { count: 0, totalIntensity: 0 };
        regions[d.region].count += 1;
        regions[d.region].totalIntensity += d.intensity || 0;
      }
    });
    return Object.entries(regions)
      .map(([name, stats]) => ({
        name,
        count: stats.count,
        avgIntensity: Number((stats.totalIntensity / stats.count).toFixed(2)),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [filteredData]);

  const regionRelevance = useMemo(() => {
    const regions: Record<string, { total: number; count: number }> = {};
    filteredData.forEach((d: any) => {
      if (d.region) {
        if (!regions[d.region]) regions[d.region] = { total: 0, count: 0 };
        regions[d.region].total += d.relevance || 0;
        regions[d.region].count += 1;
      }
    });
    return Object.entries(regions)
      .map(([name, stats]) => ({
        name,
        avgRelevance: Number((stats.total / stats.count).toFixed(2)),
      }))
      .sort((a, b) => b.avgRelevance - a.avgRelevance)
      .slice(0, 10);
  }, [filteredData]);

  const countryData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredData.forEach((d: any) => {
      if (d.country) counts[d.country] = (counts[d.country] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [filteredData]);

  const sectorIntensity = useMemo(() => {
    const sectors: Record<string, { total: number; count: number }> = {};
    filteredData.forEach((d: any) => {
      const s = d.sector || "Other";
      if (!sectors[s]) sectors[s] = { total: 0, count: 0 };
      sectors[s].total += d.intensity || 0;
      sectors[s].count += 1;
    });
    return Object.entries(sectors)
      .map(([name, stats]) => ({
        name,
        averageIntensity: Number((stats.total / stats.count).toFixed(2)),
      }))
      .sort((a, b) => b.averageIntensity - a.averageIntensity)
      .slice(0, 8);
  }, [filteredData]);

  const yearlyTrends = useMemo(() => {
    const years: Record<
      number,
      {
        intensity: number;
        likelihood: number;
        relevance: number;
        count: number;
      }
    > = {};
    filteredData.forEach((d: any) => {
      if (d.end_year) {
        const year = Number(d.end_year);
        if (!years[year]) {
          years[year] = { intensity: 0, likelihood: 0, relevance: 0, count: 0 };
        }
        years[year].intensity += d.intensity || 0;
        years[year].likelihood += d.likelihood || 0;
        years[year].relevance += d.relevance || 0;
        years[year].count += 1;
      }
    });
    return Object.entries(years)
      .map(([year, stats]) => ({
        year: Number(year),
        intensity: Number((stats.intensity / stats.count).toFixed(2)),
        likelihood: Number((stats.likelihood / stats.count).toFixed(2)),
        relevance: Number((stats.relevance / stats.count).toFixed(2)),
      }))
      .sort((a, b) => a.year - b.year);
  }, [filteredData]);

  const yearlyLikelihood = useMemo(() => {
    const years: Record<number, { total: number; count: number }> = {};
    filteredData.forEach((d: any) => {
      if (d.end_year) {
        const year = Number(d.end_year);
        if (!years[year]) years[year] = { total: 0, count: 0 };
        years[year].total += d.likelihood || 0;
        years[year].count += 1;
      }
    });
    return Object.entries(years)
      .map(([year, stats]) => ({
        year: year,
        avgLikelihood: Number((stats.total / stats.count).toFixed(2)),
      }))
      .sort((a, b) => Number(a.year) - Number(b.year));
  }, [filteredData]);

  const topicIntensity = useMemo(() => {
    const topics: Record<string, number> = {};
    filteredData.forEach((d: any) => {
      if (d.topic) topics[d.topic] = (topics[d.topic] || 0) + d.intensity;
    });
    return Object.entries(topics)
      .map(([topic, intensity]) => ({ topic, intensity }))
      .sort((a, b) => b.intensity - a.intensity)
      .slice(0, 10);
  }, [filteredData]);

  const radarData = useMemo(() => {
    const sectors = [...new Set(filteredData.map((d: any) => d.sector))]
      .filter(Boolean)
      .slice(0, 5);
    return sectors.map((s) => {
      const items = filteredData.filter((d) => d.sector === s);
      const avgLikelihood =
        items.reduce((acc, curr) => acc + (curr.likelihood || 0), 0) /
        items.length;
      const avgRelevance =
        items.reduce((acc, curr) => acc + (curr.relevance || 0), 0) /
        items.length;
      return {
        subject: s,
        likelihood: avgLikelihood * 20,
        relevance: avgRelevance * 20,
      };
    });
  }, [filteredData]);

  const stats = useMemo(
    () => ({
      avgIntensity: (
        (filteredData?.reduce((a: any, b: any) => a + (b.intensity || 0), 0) ||
          0) / (filteredData?.length || 1)
      ).toFixed(1),
      avgLikelihood: (
        (filteredData?.reduce((a: any, b: any) => a + (b.likelihood || 0), 0) ||
          0) / (filteredData?.length || 1)
      ).toFixed(1),
      avgRelevance: (
        (filteredData?.reduce((a: any, b: any) => a + (b.relevance || 0), 0) ||
          0) / (filteredData?.length || 1)
      ).toFixed(1),
      totalInsights: filteredData?.length || 0,
    }),
    [filteredData],
  );

  if (loading) return <DashboardSkeleton />;

  const tabs = [
    { id: "trends", label: "Trends", icon: <TrendingUp size={16} /> },
    {
      id: "distribution",
      label: "Distribution",
      icon: <PieChartIcon size={16} />,
    },
    { id: "regional", label: "Regional", icon: <Globe2 size={16} /> },
    { id: "analysis", label: "Advanced", icon: <Zap size={16} /> },
  ];

  return (
    <div className='p-4 lg:p-8'>
      <header className='flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-slate-800 dark:text-slate-100'>
            Analytics Overview
          </h1>
          <p className='text-slate-500 dark:text-slate-400 text-sm'>
            Insights and data visualization
          </p>
        </div>
        <div className='flex items-center gap-3'>
          {hasActiveFilters && (
            <button
              onClick={() =>
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
                })
              }
              className='flex items-center gap-2 px-4 py-2 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-sm font-bold rounded-xl border border-rose-100 dark:border-rose-800/50 hover:bg-rose-100 transition-all'
            >
              <XCircle size={16} /> Clear Filters
            </button>
          )}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className='lg:hidden p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl'
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Stats Section */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <StatCard
          label='Avg Intensity'
          value={stats.avgIntensity}
          icon={<Activity />}
          bg='bg-indigo-500'
        />
        <StatCard
          label='Avg Likelihood'
          value={stats.avgLikelihood}
          icon={<HandHeart />}
          bg='bg-rose-500'
        />
        <StatCard
          label='Avg Relevance'
          value={stats.avgRelevance}
          icon={<Layers />}
          bg='bg-violet-500'
        />
        <StatCard
          label='Total Insights'
          value={stats.totalInsights}
          icon={<Database />}
          bg='bg-amber-500'
        />
      </div>

      {/* Tabs Switcher */}
      <div className='flex p-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-2xl w-fit mb-8 overflow-hidden'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dynamic Tab Content */}
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
        {activeTab === "trends" && (
          <>
            <LineChartComponent
              title='Yearly Metric Trends'
              data={yearlyTrends}
              xKey='year'
              dataKeys={[
                { key: "intensity", name: "Intensity", color: colors.primary },
                {
                  key: "likelihood",
                  name: "Likelihood",
                  color: colors.secondary,
                },
                { key: "relevance", name: "Relevance", color: colors.info },
              ]}
            />
            <BarChartComponent
              title='Yearly Avg Likelihood'
              data={yearlyLikelihood}
              xKey='year'
              yKey='avgLikelihood'
              color={colors.secondary}
            />
            <BarChartComponent
              title='Top Topics by Intensity'
              data={topicIntensity}
              xKey='topic'
              yKey='intensity'
              color={colors.accent}
            />
          </>
        )}

        {activeTab === "distribution" && (
          <>
            <PieChartComponent title='Insights by Sector' data={sectorData} />
            <PieChartComponent title='PESTLE Distribution' data={pestleData} />
            <RadialBarChartComponent
              title='SWOT Strategic Breakdown'
              data={swotData}
            />
            <BarChartComponent
              title='Avg Intensity per Sector'
              data={sectorIntensity}
              xKey='name'
              yKey='averageIntensity'
              color={colors.secondary}
              horizontal={true}
            />
          </>
        )}

        {activeTab === "regional" && (
          <>
            <BarChartComponent
              title='Top City Hubs by Insight Volume'
              data={cityData}
              xKey='name'
              yKey='value'
              color={colors.primary}
              horizontal={true}
            />
            <ComposedChartComponent
              title='Region: Count vs Intensity'
              data={regionComposedData}
              xKey='name'
              barKey='count'
              lineKey='avgIntensity'
              barName='Insight Count'
              lineName='Avg Intensity'
              barColor={colors.success}
              lineColor={colors.accent}
              horizontal={false}
            />
            <BarChartComponent
              title='Insights per Country'
              data={countryData}
              xKey='country'
              yKey='count'
              color={colors.warning}
              horizontal={true}
            />
            <BarChartComponent
              title='Avg Relevance by Region'
              data={regionRelevance}
              xKey='name'
              yKey='avgRelevance'
              color={colors.secondary}
              horizontal={true}
            />
          </>
        )}

        {activeTab === "analysis" && (
          <>
            <RadarChartComponent
              title='Sector: Likelihood vs Relevance'
              data={radarData}
              angleKey='subject'
              dataKeys={[
                {
                  key: "likelihood",
                  name: "Likelihood",
                  color: colors.secondary,
                },
                { key: "relevance", name: "Relevance", color: colors.info },
              ]}
            />
            <div className='xl:col-span-2'>
              <ScatterChartComponent
                title='Correlation: Intensity vs Relevance'
                data={filteredData.slice(0, 100)}
                xKey='intensity'
                yKey='relevance'
                categoryKey='sector'
                xLabel='Intensity'
                yLabel='Relevance'
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
}
