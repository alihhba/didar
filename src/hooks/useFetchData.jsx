import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFetchData = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refetchIndex, setRefetchIndex] = useState(0);
    const token = JSON.parse(localStorage.getItem('user-data'))?.access;

    const refetch = useCallback(() => {
        setRefetchIndex((prev) => prev + 1);
    }, []);

    useEffect(() => {
        if (!url) return;

        let isCancelled = false;

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(url, {
                    ...options,
                    withCredentials: true,
                    headers: {
                        // If there are headers already in options, merge them with our Authorization header
                        ...options.headers,
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!isCancelled) {
                    setData(response.data);
                    setError(null);
                }
            } catch (err) {
                if (!isCancelled) {
                    setError(err);
                    setData(null);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isCancelled = true;
        };
    }, [url, refetchIndex, token]); // Include token in dependency array if it might change

    return { data, error, loading, refetch };
};

export default useFetchData;
