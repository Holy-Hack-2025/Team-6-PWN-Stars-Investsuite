import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Stock } from '@/types/stocks';
import { Head } from '@inertiajs/react';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
interface Props {
    stocks: Stock[];
}
function getPastThreeMonthsDates() {
    const today = dayjs();
    const startDate = today.subtract(3, 'month').startOf('month');
    const endDate = today.endOf('day');

    const dates = [];
    let currentDate = startDate;

    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
        if (currentDate.day() !== 0 && currentDate.day() !== 6) {
            // Exclude weekends
            dates.push(currentDate);
        }
        currentDate = currentDate.add(1, 'day');
    }

    return dates;
}

function calculateNetWorthAtDate(stocks: Stock[], date: Date) {
    return stocks
        .map((stock) => stock.historical?.find((frame) => dayjs(frame.date.date).isSame(dayjs(date), 'day'))?.open ?? 0 - stock.bought_price)
        .reduce((a, b) => a + b);
}

export default function Dashboard({ stocks }: Props) {
    console.log(stocks);
    const [filteredData, setFilteredData] = useState<Stock[]>([]);
    const [view, setView] = useState('all');

    const pastThreeMonths = getPastThreeMonthsDates();

    const chartData = {
        labels: pastThreeMonths
            .filter((date) => stocks[0].historical?.find((frame) => dayjs(frame.date.date).isSame(dayjs(date), 'day')) != undefined)
            .map((d) => d.format('YYYY-MM-DD')),
        datasets: [
            {
                label: 'Net Worth Change',
                data: pastThreeMonths.map((date) => calculateNetWorthAtDate(stocks, date.toDate())).filter((val) => val > 0),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0,
            },
        ],
    };

    console.log(chartData);

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

    const latestNetWorth = calculateNetWorthAtDate(stocks, dayjs().subtract(1, 'day').toDate());

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
                    <div
                        className="py-8 text-center text-5xl font-bold"
                        style={{
                            color: 'rgb(109, 101, 252)',
                        }}
                    >
                        Account value €{latestNetWorth?.toLocaleString() ?? 'N/A'}
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border py-5">
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
                    <div className="max-h-96 overflow-y-auto">
                        {' '}
                        {/* Adding scrollable container */}
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
            </div>
        </AppLayout>
    );
}
