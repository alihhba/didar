import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetMe = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = JSON.parse(localStorage.getItem('user-data'))?.access;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:8888/api/v1/auth/me/', {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setUser(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading, error };
};

export default useGetMe;
