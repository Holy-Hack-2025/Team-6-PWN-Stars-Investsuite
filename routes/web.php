<?php

use App\Http\Controllers\LearnController;
use App\Http\Controllers\StockSelectorController;
use App\Http\Controllers\WrappedController;
use App\Models\Stock;
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

        //dd(Stock::all());
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
    

    Route::get('quiz', [LearnController::class, "view"])->name('quiz');

    
    Route::get('wrapped', [WrappedController::class, "view"])->name('wrapped');


});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
