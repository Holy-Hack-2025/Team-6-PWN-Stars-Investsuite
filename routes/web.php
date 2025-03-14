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
            'stocks' => StockService::getDataForStocks(StockService::randomStocks())
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
                    'title' => 'Last Quarter you made',
                    'description' => 'You beat 60% of investors.',
                    'highlightText' => '+450.12 !',
                    'highlightTextClass' => 'text-5xl font-bold text-center mt-6',
                    'extraText' => '+2.21 %',
                    'extraTextClass' => 'text-2xl font-bold text-center mt-2',
                ],
                [
                    'title' => 'Total portfolio',
                    'highlightText' => '12,500',
                    'highlightTextClass' => 'text-5xl font-bold text-center mt-6',
                    'extraText' => 'All Time High',
                    'extraTextClass' => 'text-xl font-bold text-center mt-1 text-green-200',  // Changed to text-xl
                    'isAllTimeHigh' => true, // This boolean determines whether "All Time High" is shown
                ],

                [
                    'topText' => '🔥 Streak 6 🔥',
                    'highlightText' => 'Congrats!',
                    'description' => 'You\'ve beaten the market for the 6th quarter in a row!', // Specific description for the third slide
                ],
                [
                    'topText' => 'Play of the year!',
                    'highlightText' => 'RHM',
                    'subtitle' => '+32.5 %'
                    
                ],
                [
                    'topText' => 'Ouch that hurt!',
                    'highlightText' => 'TSLA',
                    'subtitle' => '-28.7 %'
                ],
                [
                    'highlightText' => 'Daredevil',
                    'subtitle' => 'Your portfolio experienced unusual high volatility during the last quarter.'
                ],
                [
                    'highlightText' => 'Playing it safe',
                    'subtitle' => 'Your portfolio remained steady throughout the last quarter.'
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
