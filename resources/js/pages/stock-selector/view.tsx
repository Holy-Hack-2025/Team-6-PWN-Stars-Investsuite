import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

import TinderCard from 'react-tinder-card';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stock Selector',
        href: '/stock-selector',
    },
];

export default function StockSelector() {
    const [lastDirection, setLastDirection] = useState();
    const [stocks, setStocks] = useState([1]);

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
            <div className="flex w-full justify-center">
                <div>
                    <div className="cardContainer">
                        {stocks.map((stock) => (
                            <TinderCard
                                className="swipe"
                                key="character.name"
                                onSwipe={(dir) => swiped(dir, 'character')}
                                onCardLeftScreen={() => outOfFrame('character')}
                            >
                                <div className="card bg-blue-400 text-black">
                                    <h3 className="text-center text-3xl font-bold uppercase">TSLA</h3>
                                    <p className="text-center text-3xl font-bold uppercase">€1839</p>
                                    <img src="https://dummyimage.com/400x200/000/fff"></img>
                                    <p className="px-2">
                                        Stat <span className="float-right">A</span>
                                    </p>
                                    <p className="px-2">
                                        Stat <span className="float-right">A</span>
                                    </p>
                                    <p className="px-2">
                                        Stat <span className="float-right">A</span>
                                    </p>
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
