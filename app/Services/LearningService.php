<?php

namespace App\Services;

class LearningService {
    // TODO: dynamically generate these
    private static array $questions = [
        [
            "question" => "What is a stock?",
            "correctAnswer" => "A share of ownership in a company",
            "options" => [
                "A share of ownership in a company",
                "A loan given to a company",
                "A type of bond",
                "A form of government security"
            ],
            "explanation" => "A stock represents partial ownership in a company, meaning you own a fraction of the business."
        ],
        [
            "question" => "What does 'diversification' mean in investing?",
            "correctAnswer" => "Spreading investments across different assets to reduce risk",
            "options" => [
                "Spreading investments across different assets to reduce risk",
                "Investing all money in one asset",
                "Avoiding all risky investments",
                "Investing only in stocks"
            ],
            "explanation" => "Diversification helps reduce risk by ensuring your portfolio is not dependent on the performance of a single investment."
        ],
        [
            "question" => "What is the main advantage of investing in index funds?",
            "correctAnswer" => "They provide broad market exposure at a low cost",
            "options" => [
                "They provide broad market exposure at a low cost",
                "They guarantee high returns",
                "They only include high-dividend stocks",
                "They are actively managed by professionals"
            ],
            "explanation" => "Index funds passively track a market index, keeping fees low while providing broad diversification."
        ],
        [
            "question" => "What is a bond?",
            "correctAnswer" => "A loan made by an investor to a government or company",
            "options" => [
                "A loan made by an investor to a government or company",
                "A type of stock",
                "A form of real estate investment",
                "An insurance policy"
            ],
            "explanation" => "Bonds are fixed-income securities where investors lend money to entities in exchange for periodic interest payments."
        ],
        [
            "question" => "Which type of investment typically has the highest long-term returns?",
            "correctAnswer" => "Stocks",
            "options" => [
                "Stocks",
                "Bonds",
                "Savings accounts",
                "Gold"
            ],
            "explanation" => "Historically, stocks have outperformed other asset classes over long periods due to economic growth and compounding returns."
        ]
    ];

    public static function getFiveRandomQuestions(): array {
        $randomKeys = array_rand(self::$questions, 5);
        $randomQuestions = [];
        foreach ($randomKeys as $key) {
            $randomQuestions[] = self::$questions[$key];
        }
        return $randomQuestions;
    }
    
}