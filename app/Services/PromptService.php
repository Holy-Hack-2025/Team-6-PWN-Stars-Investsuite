<?php
namespace App\Services;
use GeminiAPI\Client;
use GeminiAPI\Resources\ModelName;
use GeminiAPI\Resources\Parts\TextPart;

class PromptService {
    public static function infer(string $prompt) {
        $client = new Client('AIzaSyDt7YFFVYsyOgWgCqmd7uSYueNtpMjmcRI');
        $response = $client->generativeModel(ModelName::GEMINI_1_5_FLASH)->generateContent(
            new TextPart($prompt),
        );
        
        return $response->text();
    }
}