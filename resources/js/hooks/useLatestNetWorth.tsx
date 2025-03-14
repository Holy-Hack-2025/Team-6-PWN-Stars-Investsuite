import { Stock } from '@/types/stocks';

type DataSet = {
    date: string;
    netWorth: number;
};

function useLatestNetWorth(stocks: Stock[]) {
    return stocks.map((stock) => stock.quote.ask - stock.bought_price).reduce((a, b) => a + b);
}

export default useLatestNetWorth;
