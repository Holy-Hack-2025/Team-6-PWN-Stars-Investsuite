<?php
namespace App\Services;

use Scheb\YahooFinanceApi\ApiClient;
use Scheb\YahooFinanceApi\ApiClientFactory;

class StockService {
    /**
     * @return \Scheb\YahooFinanceApi\Results\HistoricalData[]
     */
    public static function getDataForStock(string $stockName) {
        $client = ApiClientFactory::createApiClient();

        // Returns an array of Scheb\YahooFinanceApi\Results\HistoricalData
        $historicalData = $client->getHistoricalQuoteData(
            $stockName,
            ApiClient::INTERVAL_1_DAY,
            new \DateTime("-30 days"),
            new \DateTime("today")
        );
        return [
            "name" => $stockName, 
            "historical" => $historicalData
        ];
    }

    public static function getDataForStocks(array $stockNames) {
        $out = [];

        foreach($stockNames as $stockName) {
            $out[] = self::getDataForStock($stockName);
        }

        return $out;
    }

    public static function randomStocks():array {
        return [
            "AAPL",
            "XOM",
            "NVDA",
            "PG",
            "TSLA",
            "JPM",
            "PFE",
            "MCD",
            "CAT",
            "BA"
        ];
    }
}