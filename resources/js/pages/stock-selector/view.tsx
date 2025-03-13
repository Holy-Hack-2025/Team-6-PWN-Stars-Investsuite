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

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete);
        setLastDirection(direction);
    };

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex w-full justify-center">
                <div>
                    <link href="https://fonts.googleapis.com/css?family=Damion&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css?family=Alatsi&display=swap" rel="stylesheet" />
                    <h1>React Tinder Card</h1>
                    <div className="cardContainer">
                        <TinderCard
                            className="swipe"
                            key="character.name"
                            onSwipe={(dir) => swiped(dir, 'character')}
                            onCardLeftScreen={() => outOfFrame('character')}
                        >
                            <div style={{ backgroundImage: 'url(' + 'https://dummyimage.com/400x400/000/fff' + ')' }} className="card">
                                <h3>character.name</h3>
                            </div>
                        </TinderCard>
                    </div>
                    {lastDirection ? <h2 className="infoText">You swiped {lastDirection}</h2> : <h2 className="infoText" />}
                </div>
            </div>
        </AppLayout>
    );
}
