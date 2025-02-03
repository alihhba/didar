import { useState } from 'react';
import axios from 'axios';

const usePostNewTicket = () => {
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const userData = JSON.parse(localStorage.getItem('user-data'));
    const token = userData?.access;

    const url ='http://localhost:8888/api/v1/tickets/';


    const postTicket = async (payload) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${url}`,
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

export default usePostNewTicket;
