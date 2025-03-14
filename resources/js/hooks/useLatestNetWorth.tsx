import { useEffect, useState } from 'react';

type DataSet = {
    date: string;
    netWorth: number;
};

function useLatestNetWorth() {
    const [latestNetWorth, setLatestNetWorth] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('/networth.json'); // Adjust path as necessary
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: DataSet[] = await response.json();

                if (data && data.length > 0) {
                    const latest = data[data.length - 1];
                    setLatestNetWorth(latest.netWorth);
                } else {
                    setLatestNetWorth(null);
                }
            } catch (err) {
                if (err instanceof Error) {
                    setError(err);
                } else {
                    setError(new Error('An unknown error occurred.'));
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { latestNetWorth, loading, error };
}

export default useLatestNetWorth;
