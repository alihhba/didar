import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetInstructor = (instructorId) => {
    const [instructor, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = JSON.parse(localStorage.getItem('user-data'))?.access;

    useEffect(() => {
        // Only attempt to fetch if a ticketId is provided.
        if (!instructorId) return;

        const fetchTicket = async () => {
            try {
                const response = await axios.get(`http://localhost:8888/api/v1/instructors/${instructorId}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setTicket(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTicket();
    }, [instructorId]);

    return { instructor, loading, error };
};

export default useGetInstructor;
