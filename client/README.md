# InsightDB - Analytics Dashboard Client

InsightDB is a modern, responsive data visualization dashboard built with **Next.js 16**, **Tailwind CSS 4**, and **Recharts**. It provides a comprehensive interface for exploring and analyzing trend data through interactive charts, global filters, and a dedicated data explorer.

## 🚀 Features

- **Interactive Dashboard**: Multiple visualization tabs (Trends, Distribution, Regional, Advanced Analysis).
- **Comprehensive Charting**: Includes Line, Bar, Pie, Radar, Scatter, Composed, and Radial Bar charts.
- **Global Filtering**: Sidebar with real-time filtering by Year, Topic, Sector, Region, PESTLE, Source, Country, SWOT, and City.
- **Data Explorer**: A searchable, paginated table with export capabilities for CSV and PDF.
- **Dark Mode Support**: Fully integrated dark and light themes with system preference detection.
- **Strategic Analysis**: Custom logic for SWOT (Strengths, Weaknesses, Opportunities, Threats) classification based on intensity and likelihood.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Visualizations**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Fetching**: [Axios](https://axios-http.com/)

## 📦 Getting Started

### Prerequisites

- Node.js 20+
- A running instance of the InsightDB Backend

### Installation

1.Navigate to the client directory:

```bash
cd client

```

2.Install dependencies:

```bash
npm install

```

3.Set up environment variables:
Create a `.env.local` file in the `client` root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000

```

### Running Development Server

```bash
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to view the application.

## 📂 Project Structure

_`app/`: Next.js App Router pages and layouts.
_`dashboard/`: Main visualization hub. \*`explorer/`: Detailed record searching and exporting.

_`components/`: Reusable UI components and specific Chart wrappers.
_`context/`: `DashboardContext` for global state management of data and filters. \*`public/`: Static assets and icons.

## 📊 Data Logic

The client includes enrichment logic found in `context/DashboardContext.tsx`:

**\*SWOT Classification**: Items are categorized based on `intensity` and `likelihood`. High likelihood and intensity are marked as "Strengths," while low likelihood and high intensity are marked as "Threats."
**\*City Proxying**: Since the raw data lacks specific city fields, a proxy mapper assigns global hubs (e.g., "Shanghai / Beijing" for China) based on the `country` and `region` fields to enable geographical visualization.

## 📜 Deployment

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new).

1. Push your code to a Git repository.
2. Import the project into Vercel.
3. Add the `NEXT_PUBLIC_API_URL` environment variable pointing to your production backend.
