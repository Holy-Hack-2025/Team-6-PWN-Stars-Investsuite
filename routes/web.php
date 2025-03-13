<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use GeminiAPI\Client;
use GeminiAPI\Resources\ModelName;
use GeminiAPI\Resources\Parts\TextPart;

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
        $client = new Client('AIzaSyDt7YFFVYsyOgWgCqmd7uSYueNtpMjmcRI');
        $response = $client->generativeModel(ModelName::GEMINI_1_5_FLASH)->generateContent(
            new TextPart('Write a one sentence hello message'),
        );
        
        return $response->text();
    })->name('ai-test');

    Route::get('quiz', function () {
        return Inertia::render('quiz/view');

    })->name('quiz');
    

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
