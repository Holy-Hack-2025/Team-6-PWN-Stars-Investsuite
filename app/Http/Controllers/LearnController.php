<?php

namespace App\Http\Controllers;

use App\Services\LearningService;
use Cache;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LearnController extends Controller
{
    public function view() {
        return Inertia::render('quiz/view', [
            "questions" => Cache::remember("QUESTIONS", 
                now()->addDay(), 
                fn() => LearningService::getFiveRandomQuestions()
            )
        ]);
    }
}
