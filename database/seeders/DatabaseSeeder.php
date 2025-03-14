<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $stocks = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA'];

        for ($i = 0; $i < 100; $i++) {
            DB::table('stocks')->insert([
                'user_id' => 1,
                'stock_name' => $faker->randomElement($stocks),
                'bought_at' => Carbon::now()->subDays(rand(0, 183 ))->toDateTimeString(),
                'bought_price' => $faker->randomFloat(2, 1, 100)
            ]);
        }
    }
}
