import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import dayjs from "dayjs";
import useLatestNetWorth from '@/hooks/useLatestNetWorth'; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type DataSet = {
    date: string;
    netWorth: number;
};

type Stock = {
    name: string;
    symbol: string;
    dailyPerformance: number; // Percentage change for the day
};

export default function Dashboard() {
    const [data, setData] = useState<DataSet[]>([]);
    const [filteredData, setFilteredData] = useState<DataSet[]>([]);
    const [view, setView] = useState("all");
    const [stocks, setStocks] = useState<Stock[]>([]);

    // Fetch data from JSON
    useEffect(() => {
        fetch("/networth.json") // Adjust if needed
            .then((res) => res.json())
            .then((json: DataSet[]) => {
                setData(json);
                filterData(json, "all"); // Default view
            })
            .catch((err) => console.error("Error fetching data:", err));

        // Mock stock data (replace with actual API call)
        const mockStocks: Stock[] = [
            { name: "Apple Inc.", symbol: "AAPL", dailyPerformance: 1.5 },
            { name: "Google LLC", symbol: "GOOGL", dailyPerformance: -0.8 },
            { name: "Tesla Inc.", symbol: "TSLA", dailyPerformance: 3.2 },
            { name: "Amazon.com Inc.", symbol: "AMZN", dailyPerformance: 0.5 },
            { name: "Microsoft Corp.", symbol: "MSFT", dailyPerformance: -1.2 },
            { name: "Netflix Inc.", symbol: "NFLX", dailyPerformance: 2.1 },
        ];
        setStocks(mockStocks);
    }, []);

    // Filter data based on view
    useEffect(() => {
        filterData(data, view);
    }, [view, data]);

    const filterData = (dataset: DataSet[], option: string) => {
        if (!dataset.length) return;

        const today = dayjs("2025-01-01"); // Assume latest date
        let filtered: DataSet[];

        if (option === "ytd") {
            filtered = dataset.filter((d) => dayjs(d.date).isAfter(today.startOf("year")));
        } else if (option === "previousQuarter") {
            filtered = dataset.filter((d) =>
                dayjs(d.date).isAfter(today.subtract(3, "months").startOf("month")) &&
                dayjs(d.date).isBefore(today.startOf("month"))
            );
        } else {
            console.log("Showing all data"); // Debugging
            filtered = dataset;
        }

        setFilteredData(filtered);
    };

    const chartData = {
        labels: filteredData.map((d: DataSet) => d.date),
        datasets: [
            {
                label: "Net Worth Change (%)",
                data: filteredData.map((d, i) =>
                    i === 0 ? 0 : ((d.netWorth - filteredData[0].netWorth) / filteredData[0].netWorth) * 100
                ),
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.3,
            },
        ],
    };

    const chartOptions = {
      plugins: {
        legend: {
          display: false, // Remove legend
        },
      },
      elements: {
        point: {
            radius: 0,
        },
      },
    };

    const handleButtonClick = (option: string) => {
        console.log("Selected view:", option); // Debugging
        setView(option);
    };

    const { latestNetWorth, loading, error } = useLatestNetWorth();

    if (loading) {
        return <div className="text-5xl font-bold text-center text-blue-600 dark:text-blue-400 py-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-5xl font-bold text-center text-red-600 dark:text-red-400 py-8">Error: {error}</div>;
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Updated Total Balance Section */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border p-4">
                    <div className="text-5xl font-bold text-center text-blue-600 dark:text-blue-400 py-8">
                        Total Balance: €{latestNetWorth?.toLocaleString() ?? "N/A"}
                    </div>
                </div>

                {/* Chart Section */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <Line data={chartData} options={chartOptions}/>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => handleButtonClick("all")}
                            className={`mx-2 px-4 py-2 rounded ${
                                view === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => handleButtonClick("ytd")}
                            className={`mx-2 px-4 py-2 rounded ${
                                view === "ytd" ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                        >
                            YTD
                        </button>
                        <button
                            onClick={() => handleButtonClick("previousQuarter")}
                            className={`mx-2 px-4 py-2 rounded ${
                                view === "previousQuarter" ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                        >
                            Previous Quarter
                        </button>
                    </div>
                </div>

                {/* Scrollable Stock List Section */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
                    <h2 className="text-2xl font-bold mb-4">Owned Stocks</h2>
                    <div className="overflow-y-auto max-h-64"> {/* Scrollable container */}
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b">
                                    <th className="p-2">Stock</th>
                                    <th className="p-2">Symbol</th>
                                    <th className="p-2">Daily Performance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stocks.map((stock, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-2">{stock.name}</td>
                                        <td className="p-2">{stock.symbol}</td>
                                        <td className={`p-2 ${
                                            stock.dailyPerformance >= 0 ? "text-green-500" : "text-red-500"
                                        }`}>
                                            {stock.dailyPerformance}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}