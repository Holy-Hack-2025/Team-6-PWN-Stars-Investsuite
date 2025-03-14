<?php

namespace App\Http\Controllers;

use App\Models\WatchlistItem;
use App\Services\StockService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StockSelectorController extends Controller
{
    public function view () {
        return Inertia::render('stock-selector/view', [
            'stocks' => StockService::getDataForStocks(StockService::randomStocks()),
            'watchList' => Auth::user()->watchlistItems
        ]);
    }

    public function store() {
        $data = \Illuminate\Support\Facades\Request::validate([
            "name" => "required"
        ]);

        $name = $data["name"];
        WatchlistItem::create([
            "stock_name" => $name,
            "user_id" => Auth::user()->id,
        ]);
    }

    public function destroy(string $name) {
        Auth::user()->watchlistItems->firstWhere("stock_name", $name)?->delete();
    }
}
