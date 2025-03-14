<?php

namespace App\Services;

use App\Models\User;

class WrappedService {
    public static function giveWrapped(User $user) {
        return [
            [
                'title' => 'Total portfolio',
                'highlightText' => '€13.485,21',
                'highlightTextClass' => 'text-5xl font-bold text-center mt-6',
                'extraText' => 'All Time High',
                'extraTextClass' => 'text-xl font-bold text-center mt-1 text-green-200',
                'isAllTimeHigh' => true,
            ],
            [
                'title' => 'Last Quarter you made',
                'description' => 'You beat 60% of investors.',
                'highlightText' => '+€450.12 !',
                'highlightTextClass' => 'text-5xl font-bold text-center mt-6',
                'percentGreen' => '+32.5 %',
                'extraTextClass' => 'text-2xl font-bold text-center mt-2',
            ],
            [
                'topText' => '🔥 Streak 6 🔥',
                'highlightText' => 'Congrats!',
                'description' => 'You\'ve beaten the market for the 6th quarter in a row!',
            ],
            [
                'topText' => 'Play of the year!',
                'highlightText' => 'RHM',
                'percentGreen' => '+32.5 %',
            ],
            [
                'topText' => 'Ouch that hurt!',
                'highlightText' => 'TSLA',
                'percentRed' => '-24.7 %',
            ],
            [
                'highlightText' => 'Daredevil',
                'subtitle' => 'Your portfolio experienced unusual high volatility during the last quarter.',
            ],
            // [
            //     'highlightText' => 'Playing it safe',
            //     'subtitle' => 'Your portfolio remained steady throughout the last quarter.',
            // ],
            [
                'title' => 'At the current rate in 5 years your portfolio will be worth €156,000.',
                'description' => "Only 20 more quarters like these and you'll be a millionaire!",
                'highlightTextClass' => 'text-5xl font-bold text-center mt-6',
            ],
            [
                'title' => 'These are the sectors you invested in',
                'sampleData' => [
                    ['sector' => 'Tech', 'count' => 30, 'color' => '#f02252'],
                    ['sector' => 'Healthcare', 'count' => 20, 'color' => '#0b00fd'],
                    ['sector' => 'Energy', 'count' => 25, 'color' => '#24B758'],
                    ['sector' => 'Defence', 'count' => 25, 'color' => '#e1e5df'],
                ],
            ],
        ];
    }
}