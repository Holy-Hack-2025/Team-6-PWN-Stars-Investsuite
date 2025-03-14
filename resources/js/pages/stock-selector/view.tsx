import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import React, { useMemo, useRef, useState } from 'react';

import { Line } from 'react-chartjs-2';
import TinderCard from 'react-tinder-card';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stock Selector',
        href: '/stock-selector',
    },
];

interface TimeFrame {
    open: number;
    high: number;
    close: number;
    date: { date: string };
}

interface Stock {
    historical: TimeFrame[];
    name: string;
    quote: {
        ask: number;
        epsForward: number;
        forwardPE: number;
    };
}

interface Props {
    stocks: Stock[];
    watchList: {
        stock_name: string;
    }[];
}

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function StockSelector({ stocks: stockProps, watchList }: Props) {
    const [stocks, setStocks] = useState(stockProps);
    console.log(stocks);
    const [currentIndex, setCurrentIndex] = useState(stocks.length - 1);
    const currentIndexRef = useRef(currentIndex);
    const childRefs = useMemo(
        () =>
            Array(stocks.length)
                .fill(0)
                .map((i) => React.createRef()),
        [],
    );

    const updateCurrentIndex = (val: number) => {
        setCurrentIndex(val);
        currentIndexRef.current = val;
    };

    const swiped = (direction: string, nameToDelete: string, index: number) => {
        if (direction == 'right') {
            router.post('/stock-selector', { name: stocks[index].name });
        }
        updateCurrentIndex(index - 1);
        setTimeout(() => setStocks((stocks) => stocks.slice(0, stocks.length - 1)), 1000);
    };

    const canSwipe = currentIndex >= 0;

    const swipe = async (dir: string) => {
        if (canSwipe && currentIndex < stocks.length) {
            await childRefs[currentIndex].current.swipe(dir);
        }
    };
    const outOfFrame = (name: string, idx: number) => {
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stock selector" />
            <h1 className="mt-3 text-center text-3xl">Stock Swiper</h1>
            <div className="flex w-full justify-center p-5">
                <div>
                    <div className="cardContainer">
                        {stocks.map((stock, index) => (
                            <TinderCard
                                key={index}
                                ref={childRefs[index]}
                                className="swipe"
                                onSwipe={(dir) => swiped(dir, stock.name, index)}
                                onCardLeftScreen={() => outOfFrame(stock.name, index)}
                            >
                                <div className="card bg-white p-4 text-black">
                                    <h3 className="text-center text-3xl font-bold uppercase">{stock.name}</h3>
                                    <p className="text-center text-3xl font-bold uppercase">{stock.quote.ask}</p>
                                    <Line
                                        options={{
                                            elements: {
                                                point: {
                                                    radius: 0,
                                                },
                                            },
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    display: false,
                                                },
                                            },
                                            scales: {
                                                x: {
                                                    display: false,
                                                },
                                            },
                                        }}
                                        data={{
                                            datasets: [
                                                {
                                                    label: 'Stock',
                                                    data: stock.historical.map((tf) => tf.open),
                                                    borderColor: 'rgb(255, 99, 132)',
                                                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                                },
                                            ],
                                            labels: stock.historical.map((tf) =>
                                                new Date(tf.date.date).toLocaleDateString('nl-BE', { month: '2-digit', day: '2-digit' }),
                                            ),
                                        }}
                                    />
                                    <div className="mt-2 px-8">
                                        <p>
                                            EPS <span className="float-right">{stock.quote.epsForward}</span>
                                        </p>
                                        <p>
                                            PE <span className="float-right">{stock.quote.forwardPE}</span>
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <Button variant="ghost">View pitch</Button>
                                    </div>
                                </div>
                            </TinderCard>
                        ))}
                    </div>
                    <div className="mt-4 hidden justify-center md:flex">
                        <Button className="mr-2" variant="destructive" onClick={() => swipe('left')}>
                            Swipe Left
                        </Button>
                        <Button className="ml-2" onClick={() => swipe('right')}>
                            Swipe Right
                        </Button>
                    </div>
                </div>
            </div>
            <div className="mx-auto w-full p-4">
                <p className="text-center text-xl">Watchlist</p>
                <Table className="table-auto border-collapse border border-gray-200 shadow-md">
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            <TableHead className="border border-gray-200 px-4 py-2">Stock Name</TableHead>
                            <TableHead className="border border-gray-200 px-4 py-2">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {watchList.map((stock, index) => (
                            <TableRow key={`${index}-${index}`} className="hover:bg-gray-50">
                                <TableCell className="border border-gray-200 px-4 py-2">{stock.stock_name}</TableCell>
                                <TableCell className="w-0 border border-gray-200 px-4 py-2 text-center">
                                    <Button
                                        onClick={() => {
                                            // TODO
                                        }}
                                        className="mr-2"
                                    >
                                        More detail
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => {
                                            router.delete('/stock-selector/' + stock.stock_name);
                                        }}
                                    >
                                        Unwatch
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
