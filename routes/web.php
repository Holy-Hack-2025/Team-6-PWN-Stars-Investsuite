<?php

use App\Services\PromptService;
use App\Services\StockService;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('stock-selector', function () {
        return Inertia::render('stock-selector/view', [
            'stocks' => [StockService::getDataForStock("AAPL")]
        ]);
    })->name('stock-selector');
    
    Route::get('ai-test', function () {
        return PromptService::infer("Say hello");
    })->name('ai-test');

    Route::get('quiz', function () {
        return Inertia::render('quiz/view');

    })->name('quiz');

    
    Route::get('wrapped', function () {
        return Inertia::render('wrapped/view', [
            "cards" => [
                [
                    'title' => 'Last Quarter you made', // Title without the 450.12
                    'description' => 'You beat 60% of investors.',
                    'highlightText' => '<span style="font-size: 3rem; font-weight: bold;">+450.12 !</span>', // Highlighted text for the first card
                    'highlightTextClass' => 'text-5xl font-bold text-center mt-6', // Customize spacing and style
                    'extraText' => '<span style="font-size: 2rem; color: #fff;">+2.21 %</span>', // Additional text under the highlighted number
                    'extraTextClass' => 'text-2xl font-bold text-center mt-2', // Customize the space between highlight and extra text
                ],
                [
                    'title' => 'Top Asset Classes',
                    'description' => 'These were your most invested asset categories.'
                ],
                [
                    'title' => 'Biggest Wins',
                    'description' => 'Your best-performing stocks and investments!'
                ],
                [
                    'title' => 'Time in the Market',
                    'description' => 'See how long you\'ve held onto key investments.'
                ],
                [
                    'title' => 'Final Insights',
                    'description' => 'A recap of your investing journey this year!'
                ]
            ]
        ]);

    })->name('wrapped');
    
    Route::get('stock-test', function () {
         StockService::getDataForStock("AAPL");
    })->name('stock-test');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
