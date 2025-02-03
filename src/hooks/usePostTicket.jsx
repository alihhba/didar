import { useState } from 'react';
import axios from 'axios';

const usePostTicket = (id) => {
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const userData = JSON.parse(localStorage.getItem('user-data'));
    const isInstructor = userData?.is_instructor;
    const token = userData?.access;

    const url = isInstructor
        ? 'http://localhost:8888/api/v1/instructor/tickets/'
        : 'http://localhost:8888/api/v1/tickets/';


    const postTicket = async (payload) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${url}${id}/`,
                payload,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTicket(response.data);
            return response.data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { ticket, loading, error, postTicket };
};

export default usePostTicket;
