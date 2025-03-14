<?php

use App\Http\Controllers\StockSelectorController;
use App\Services\LearningService;
use App\Services\PromptService;
use App\Services\StockService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        //$res = Http::get("https://newsapi.org/v2/everything?q=Apple&from=2025-03-10&sortBy=popularity&apiKey=af1708d05fc54d82b951c80c295c2bd3");
        //dd($res->json());


        $user = Auth::user();
        $greeting = Cache::remember("GREETING.".$user->id, now()->addDay(), function() use ($user) {
            return PromptService::infer("Write a personalized greeting for " . $user->name . " who just opened their investing app. They already know the app, it should just be a welcome.");
        } );
        return Inertia::render('dashboard', [
            'greeting' => $greeting
        ]);
    })->name('dashboard');

    Route::get('stock-selector', [StockSelectorController::class, "view"])->name('stock-selector');
    Route::post('stock-selector', [StockSelectorController::class, "store"])->name('stock-selector.store');
    Route::delete('stock-selector/{name}', [StockSelectorController::class, "destroy"])->name('stock-selector.destroy');
    

    Route::get('quiz', function () {
        return Inertia::render('quiz/view', [
            "questions" => Cache::remember("QUESTIONS", now()->addDay(), fn() => LearningService::getFiveRandomQuestions())
        ]);

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
                'extraTextClass' => 'text-xl font-bold text-center mt-1 text-green-200',
                'isAllTimeHigh' => true,
            ],
            [
                'topText' => '🔥 Streak 6 🔥',
                'highlightText' => 'Congrats!',
                'description' => 'You\'ve beaten the market for the 6th quarter in a row!',
            ],
            [
                'topText' => 'Play of the year!',
                'highlightText' => 'RHM',
                'subtitle' => '+32.5 %',
            ],
            [
                'topText' => 'Ouch that hurt!',
                'highlightText' => 'TSLA',
                'subtitle' => '-28.7 %',
            ],
            [
                'highlightText' => 'Daredevil',
                'subtitle' => 'Your portfolio experienced unusual high volatility during the last quarter.',
            ],
            [
                'highlightText' => 'Playing it safe',
                'subtitle' => 'Your portfolio remained steady throughout the last quarter.',
            ],
            [
                'title' => 'At this current rate, in 5 years you\'ll have',
                'highlightText' => '30,000 !',
                'highlightTextClass' => 'text-5xl font-bold text-center mt-6',
            ],
            [
                'title' => 'These are the sectors you invested in',
                'sampleData' => json_encode([
                    ['sector' => 'Tech', 'count' => 30, 'color' => '#f02252'],
                    ['sector' => 'Healthcare', 'count' => 20, 'color' => '#0b00fd'],
                    ['sector' => 'Energy', 'count' => 25, 'color' => '#3ded97'],
                    ['sector' => 'Defence', 'count' => 25, 'color' => '#e1e5df'],
                ]),
            ],
        ], // <-- Closing the cards array properly here
    ]); // <-- Closing the Inertia::render method properly here
    })->name('wrapped');


});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
