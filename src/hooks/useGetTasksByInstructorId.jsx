import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useGetTasksByInstructorId = (id) => {
    const [tasks, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refetchIndex, setRefetchIndex] = useState(0);
    const token = JSON.parse(localStorage.getItem('user-data'))?.access;

    const url =  `http://localhost:8888/api/v1/instructor/${id}/schedules/`


    useEffect(() => {
        if (!id) return;

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
    }, [id, refetchIndex, token, url]);

    const refetch = useCallback(() => {
        setRefetchIndex((prevIndex) => prevIndex + 1);
    }, []);

    return { tasks, loading, error, refetch };
};

export default useGetTasksByInstructorId;
