<?php
namespace App\Services;

use Cache;
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
            new \DateTime("- 1 year"),
            new \DateTime("today")
        );
        
        return [
            "name" => $stockName, 
            "historical" => $historicalData,
            "quote" =>  $client->getQuote($stockName)
        ];
    }

    public static function getDataForStocks(array $stockNames) {
        return Cache::remember("STOCKS.DATA.".implode(",",$stockNames), now()->addDay(), function () use ($stockNames) {
            $out = [];

            foreach($stockNames as $stockName) {
                $out[] = self::getDataForStock($stockName);
            }

            return $out;
        });
    }

    public static function randomStocks():array {
        return [
            'AAPL',  // Apple Inc.
            'MSFT',  // Microsoft Corporation
            'AMZN',  // Amazon.com, Inc.
            'GOOGL', // Alphabet Inc. (Class A)
            'META',  // Meta Platforms, Inc.
            'NVDA',  // Nvidia Corporation
            'TSLA',  // Tesla, Inc.
        ];
    }
}