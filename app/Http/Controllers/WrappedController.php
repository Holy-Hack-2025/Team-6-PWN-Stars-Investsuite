<?php

namespace App\Http\Controllers;

use App\Services\WrappedService;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WrappedController extends Controller
{
    public function view() {
        return Inertia::render('wrapped/view', [
            "cards" => WrappedService::giveWrapped(Auth::user())
        ]);
    }
}
