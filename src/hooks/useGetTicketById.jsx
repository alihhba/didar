import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useGetTicket = (ticketId) => {
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refetchIndex, setRefetchIndex] = useState(0);

    const isInstructor = JSON.parse(localStorage.getItem('user-data'))?.is_instructor;
    const token = JSON.parse(localStorage.getItem('user-data'))?.access;

    const url = isInstructor
        ? `http://localhost:8888/api/v1/instructor/tickets/${ticketId}`
        : `http://localhost:8888/api/v1/tickets/${ticketId}`;

    useEffect(() => {
        if (!ticketId) return;

        const fetchTicket = async () => {
            setLoading(true);
            try {
                const response = await axios.get(url, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTicket(response.data);
                setError(null);
            } catch (err) {
                setError(err);
                setTicket(null);
            } finally {
                setLoading(false);
            }
        };

        fetchTicket();
    }, [ticketId, refetchIndex, token, url]);

    const refetch = useCallback(() => {
        setRefetchIndex((prevIndex) => prevIndex + 1);
    }, []);

    return { ticket, loading, error, refetch };
};

export default useGetTicket;
