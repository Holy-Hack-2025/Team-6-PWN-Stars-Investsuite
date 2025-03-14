import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
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
}

interface Props {
    stocks: Stock[];
}

import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function StockSelector({ stocks: stockProps }: Props) {
    const [lastDirection, setLastDirection] = useState<string>();
    const [stocks, setStocks] = useState(stockProps);
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
        setLastDirection(direction);
        updateCurrentIndex(index - 1);
    };

    const canSwipe = currentIndex >= 0;

    const swipe = async (dir: string) => {
        if (canSwipe && currentIndex < stocks.length) {
            await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
        }
    };
    const outOfFrame = (name: string, idx: number) => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
        // TODO: when quickly swipe and restore multiple times the same card,
        // it happens multiple outOfFrame events are queued and the card disappear
        // during latest swipes. Only the last outOfFrame event should be considered valid
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
                                    <p className="text-center text-3xl font-bold uppercase">€1839</p>
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
                                            Stat <span className="float-right">A</span>
                                        </p>
                                        <p>
                                            Stat <span className="float-right">A</span>
                                        </p>
                                        <p>
                                            Stat <span className="float-right">A</span>
                                        </p>
                                    </div>
                                </div>
                            </TinderCard>
                        ))}
                    </div>
                    <div className="mt-4 hidden justify-center md:flex">
                        <button
                            className="mr-2 rounded bg-red-400 px-4 py-2 text-white hover:cursor-pointer hover:bg-red-300"
                            onClick={() => swipe('left')}
                        >
                            Swipe Left
                        </button>
                        <button
                            className="ml-2 rounded bg-green-400 px-4 py-2 text-white hover:cursor-pointer hover:bg-green-300"
                            onClick={() => swipe('right')}
                        >
                            Swipe Right
                        </button>
                    </div>
                    {lastDirection ? <h2 className="infoText">You swiped {lastDirection}</h2> : <h2 className="infoText" />}
                </div>
            </div>
        </AppLayout>
    );
}
