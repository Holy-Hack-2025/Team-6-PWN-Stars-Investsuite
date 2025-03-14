import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import useLatestNetWorth from '@/hooks/useLatestNetWorth';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

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
    symbol: string;
    dailyPerformance: number; // Percentage change for the quarter
    price: number; // Current stock price
    stakePercentage: number; // % in portfolio
};

export default function Dashboard() {
    const [data, setData] = useState<DataSet[]>([]);
    const [filteredData, setFilteredData] = useState<DataSet[]>([]);
    const [view, setView] = useState('all');
    const [stocks, setStocks] = useState<Stock[]>([]);

    useEffect(() => {
        fetch('/networth.json')
            .then((res) => res.json())
            .then((json: DataSet[]) => {
                setData(json);
                filterData(json, 'all');
            })
            .catch((err) => console.error('Error fetching data:', err));

        const mockStocks: Stock[] = [
            { symbol: 'TSLA', dailyPerformance: 12.5, price: 240.7, stakePercentage: 15.1 },
            { symbol: 'NVDA', dailyPerformance: 18.0, price: 115.6, stakePercentage: 12.3 },
            { symbol: 'PFE', dailyPerformance: -3.2, price: 25.6, stakePercentage: 17.6 },
            { symbol: 'JNJ', dailyPerformance: 2.8, price: 163.0, stakePercentage: 12.4 },
            { symbol: 'XOM', dailyPerformance: 7.5, price: 108.7, stakePercentage: 14.0 },
            { symbol: 'CVX', dailyPerformance: 5.4, price: 153.6, stakePercentage: 10.7 },
            { symbol: 'LMT', dailyPerformance: 10.2, price: 467.9, stakePercentage: 12.0 },
            { symbol: 'NOC', dailyPerformance: 4.7, price: 490.6, stakePercentage: 6.0 },
            { symbol: 'AAPL', dailyPerformance: 9.0, price: 209.7, stakePercentage: 7.0 },
            { symbol: 'MSFT', dailyPerformance: 6.8, price: 378.8, stakePercentage: 4.9 },
        ];
        setStocks(mockStocks);
    }, []);

    useEffect(() => {
        filterData(data, view);
    }, [view, data]);

    const filterData = (dataset: DataSet[], option: string) => {
        if (!dataset.length) return;

        const today = dayjs('2025-01-01');
        let filtered: DataSet[];

        if (option === '1Y') {
            filtered = dataset.filter(
                (d) => dayjs(d.date).isAfter(today.subtract(12, 'months').startOf('month')) && dayjs(d.date).isBefore(today.startOf('month')),
            );
        } else if (option === 'previousQuarter') {
            filtered = dataset.filter(
                (d) => dayjs(d.date).isAfter(today.subtract(4, 'months').startOf('month')) && dayjs(d.date).isBefore(today.startOf('month')),
            );
        } else {
            filtered = dataset;
        }

        setFilteredData(filtered);
    };

    const chartData = {
        labels: filteredData.map((d: DataSet) => d.date),
        datasets: [
            {
                label: 'Net Worth Change (%)',
                data: filteredData.map((d, i) => (i === 0 ? 0 : ((d.netWorth - filteredData[0].netWorth) / filteredData[0].netWorth) * 100)),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0,
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                display: false,
            },
        },
        elements: {
            point: {
                radius: 0,
            },
        },
    };

    const handleButtonClick = (option: string) => {
        setView(option);
    };

    const { latestNetWorth, loading, error } = useLatestNetWorth();

    if (loading) {
        return <div className="py-8 text-center text-5xl font-bold text-blue-600 dark:text-blue-400">Loading...</div>;
    }

    if (error) {
        return <div className="py-8 text-center text-5xl font-bold text-red-600 dark:text-red-400">Error: {error}</div>;
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
                    <div className="py-8 text-center text-5xl font-bold">
                        Total Balance €{latestNetWorth?.toLocaleString() ?? 'N/A'}
                        <Button>
                            <Link href="/wrapped">Your wrapped is ready!</Link>
                        </Button>
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <Line data={chartData} options={chartOptions} />
                </div>
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={() => handleButtonClick('all')}
                        className={`mx-2 rounded px-4 py-2 ${view === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => handleButtonClick('1Y')}
                        className={`mx-2 rounded px-4 py-2 ${view === '1Y' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        1Y
                    </button>
                    <button
                        onClick={() => handleButtonClick('previousQuarter')}
                        className={`mx-2 rounded px-4 py-2 ${view === 'previousQuarter' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Previous Quarter
                    </button>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
                    <h2 className="mb-4 text-2xl font-bold">Owned Stocks</h2>
                    <table className="w-full">
                        <thead>
                            <tr className="border-b text-left">
                                <th className="p-2">Symbol</th>
                                <th className="p-2">Price (€)</th>
                                <th className="p-2">Quarter Performance</th>
                                <th className="p-2">Stake</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stocks.map((stock, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-2">{stock.symbol}</td>
                                    <td className="p-2">€{stock.price.toFixed(2)}</td>
                                    <td className={`p-2 ${stock.dailyPerformance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {stock.dailyPerformance}%
                                    </td>
                                    <td className="p-2">{stock.stakePercentage}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
