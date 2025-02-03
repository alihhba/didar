import { useState } from 'react';
import axios from 'axios';

const useUpdateAuthMe = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const token = JSON.parse(localStorage.getItem('user-data'))?.access;

    const url = 'http://localhost:8888/api/v1/auth/me/';


    const updateAuthMe = async (payload) => {
        setLoading(true);
        try {
            const response = await axios.patch(url, payload, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserData(response.data);
            return response.data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { userData, loading, error, updateAuthMe };
};

export default useUpdateAuthMe;
