import { useState } from 'react';
import axios from 'axios';

const usePostShedule = () => {
    const [shedule, setShedule] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const userData = JSON.parse(localStorage.getItem('user-data'));
    const token = userData?.access;

    const url = 'http://localhost:8888/api/v1/instructor/schedules/';

    const postShedule = async (payload) => {
        setLoading(true);
        try {
            const response = await axios.post(
                url,
                payload,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setShedule(response.data);
            return response.data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { shedule, loading, error, postShedule };
};

export default usePostShedule;
