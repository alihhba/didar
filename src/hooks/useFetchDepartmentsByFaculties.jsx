import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchDepartmentsByFaculties = (facultiesData) => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = JSON.parse(localStorage.getItem('user-data'))?.access;

    useEffect(() => {
        // Ensure we have faculties data with results before starting
        // if (!facultiesData || !facultiesData.data || !facultiesData.data.results) return;

        // Extract faculty IDs from the fetched faculties data
        // const facultiesIds = facultiesData.data.results.map(item => item.id);
        const facultiesIds = [1,2,3,4,5,6];

        if (facultiesIds.length === 0) return;

        setLoading(true);
        setError(null);

        // Use Promise.all to fetch departments for each faculty concurrently
        Promise.all(
            facultiesIds.map(id =>
                axios.get(`http://localhost:8888/api/v1/faculties/${id}/departments/` , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
        )
            .then((responses) => {
                // Each response is assumed to have the department data in:
                // response.data.data.results (adjust this path based on your API)
                const allDepartments = responses.reduce((acc, res) => {
                    const deptResults = res.data && res.data.data && res.data.data.results
                        ? res.data.data.results
                        : [];
                    return [...acc, ...deptResults];
                }, []);
                setDepartments(allDepartments);
            })
            .catch((err) => {
                setError(err);
                setDepartments([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [facultiesData]);

    return { departments, loading, error };
};

export default useFetchDepartmentsByFaculties;
