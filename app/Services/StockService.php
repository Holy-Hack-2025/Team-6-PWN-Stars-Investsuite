<?php
namespace App\Services;

use Scheb\YahooFinanceApi\ApiClient;
use Scheb\YahooFinanceApi\ApiClientFactory;

class StockService {

    public static function getDataForStock(string $stockName) {
        $client = ApiClientFactory::createApiClient();


    // Returns an array of Scheb\YahooFinanceApi\Results\HistoricalData
    $historicalData = $client->getHistoricalQuoteData(
        "AAPL",
        ApiClient::INTERVAL_1_DAY,
        new \DateTime("-14 days"),
        new \DateTime("today")
    );
    dd($historicalData);
    }
}