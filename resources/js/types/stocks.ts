export interface TimeFrame {
    open: number;
    high: number;
    close: number;
    date: { date: string };
}

export interface Stock {
    historical: TimeFrame[];
    name: string;
    quote: {
        ask: number;
    };
    bought_at: Date;
    bought_price: number;
}
