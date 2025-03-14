<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Faker\Factory as Faker;

class StockTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $stocks = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA'];

        for ($i = 0; $i < 10; $i++) {
            DB::table('stocks')->insert([
                'user_id' => 1,
                'stock_name' => $faker->randomElement($stocks),
                'bought_at' => Carbon::now()->subDays(rand(0, 14))->toDateTimeString(),
            ]);
        }
    }
}
