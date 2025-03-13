<?php

use App\Services\PromptService;
use App\Services\StockService;
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
        return Inertia::render('stock-selector/view');
    })->name('stock-selector');
    
    Route::get('ai-test', function () {
        return PromptService::infer("Say hello");
    })->name('ai-test');

    Route::get('quiz', function () {
        return Inertia::render('quiz/view');

    })->name('quiz');
    
    Route::get('stock-test', function () {
         StockService::getDataForStock("AAPL");
    })->name('stock-test');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
