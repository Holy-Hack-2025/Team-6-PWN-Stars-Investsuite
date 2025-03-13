import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

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

type Stock = TimeFrame[];

interface Props {
    stocks: Stock[];
}

import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function StockSelector({ stocks: stockProps }: Props) {
    const [lastDirection, setLastDirection] = useState();
    const [stocks, setStocks] = useState([1]);
    console.log(stockProps);

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete);
        setLastDirection(direction);
    };

    const outOfFrame = (name) => {
        setStocks((stocks) => stocks.slice(0, stocks.length - 1));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stock selector" />
            <div className="flex w-full justify-center p-5">
                <div>
                    <div className="cardContainer">
                        {stocks.map((stock) => (
                            <TinderCard
                                className="swipe"
                                key="character.name"
                                onSwipe={(dir) => swiped(dir, 'character')}
                                onCardLeftScreen={() => outOfFrame('character')}
                            >
                                <div className="card bg-white p-4 text-black">
                                    <h3 className="text-center text-3xl font-bold uppercase">TSLA</h3>
                                    <p className="text-center text-3xl font-bold uppercase">€1839</p>
                                    <Line
                                        options={{
                                            responsive: true,
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
                                                    data: stockProps[0].map((tf) => tf.open),
                                                    borderColor: 'rgb(255, 99, 132)',
                                                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                                },
                                            ],
                                            labels: stockProps[0].map((tf) =>
                                                new Date(tf.date.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }),
                                            ),
                                        }}
                                    />
                                    <div className="mt-2">
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
                    {lastDirection ? <h2 className="infoText">You swiped {lastDirection}</h2> : <h2 className="infoText" />}
                </div>
            </div>
        </AppLayout>
    );
}
