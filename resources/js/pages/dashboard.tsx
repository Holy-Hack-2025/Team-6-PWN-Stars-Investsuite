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

export default function Dashboard() {
    const [data, setData] = useState<DataSet[]>([]);
    const [filteredData, setFilteredData] = useState<DataSet[]>([]);
    const [view, setView] = useState("all");

    // Fetch data from JSON
    useEffect(() => {
        fetch("/networth.json") // Adjust if needed
            .then((res) => res.json())
            .then((json: DataSet[]) => {
                setData(json);
                filterData(json, "all"); // Default view
            })
            .catch((err) => console.error("Error fetching data:", err));
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
            console.log(option);
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
        console.log("Click");
      setView(option);
    };

    const { latestNetWorth, loading, error } = useLatestNetWorth();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Updated Total Balance Section */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border p-4">
                    <div className="text-5xl font-bold text-center text-blue-600 dark:text-blue-400 py-8">
                        Total Balance: €{latestNetWorth.toLocaleString()}
                    </div>
                </div>

                {/* Chart Section */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <Line data={chartData} options={chartOptions}/>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => handleButtonClick("all")}
                            className={`mx-2 px-4 py-2 rounded ${view === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => handleButtonClick("ytd")}
                            className={`mx-2 px-4 py-2 rounded ${view === "ytd" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        >
                            YTD
                        </button>
                        <button
                            onClick={() => handleButtonClick("previousQuarter")}
                            className={`mx-2 px-4 py-2 rounded ${view === "previousQuarter" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        >
                            Previous Quarter
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}