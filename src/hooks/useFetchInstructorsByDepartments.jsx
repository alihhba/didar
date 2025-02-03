import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchInstructorsByDepartments = (departments) => {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = JSON.parse(localStorage.getItem('user-data'))?.access;

    useEffect(() => {
        // If departments is empty or undefined, there's nothing to do.
        if (!departments || departments.length === 0) {
            return;
        }

        setLoading(true);
        setError(null);

        // For each department, fetch its instructors.
        Promise.all(
            departments.map((department) =>
                axios
                    .get(`http://localhost:8888/api/v1/departments/${department.id}/instructors/`,{
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    })
                    .then((res) => {
                        // Adjust the following path based on your API response structure.
                        const instructorsForDept =
                            res.data &&
                            res.data.data &&
                            res.data.data.results
                                ? res.data.data.results.map((instr) => ({
                                    ...instr,
                                    // Attach the entire department object (or just select properties) as the facility.
                                    facility: department,
                                }))
                                : [];
                        return instructorsForDept;
                    })
            )
        )
            .then((results) => {
                // Flatten the array of arrays into a single array of instructors.
                const allInstructors = results.flat();
                setInstructors(allInstructors);
            })
            .catch((err) => {
                setError(err);
                setInstructors([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [departments]);

    return { instructors, loading, error };
};

export default useFetchInstructorsByDepartments;
