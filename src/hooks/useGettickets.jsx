import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isInstructor = JSON.parse(localStorage.getItem('user-data'))?.is_instructor;
    const token = JSON.parse(localStorage.getItem('user-data'))?.access;

    const url = isInstructor ? 'http://localhost:8888/api/v1/instructor/tickets/' :'http://localhost:8888/api/v1/tickets/'

    useEffect(() => {

        const fetchTickets = async () => {
            try {
                const response = await axios.get(url, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setTickets(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    return { tickets, loading, error };
};

export default useGetTickets;
