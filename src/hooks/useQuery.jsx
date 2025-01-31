import { useSearchParams } from "react-router-dom";

const useQuery = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const getQuery = (key) => {
        return searchParams.get(key);
    };

    const setQuery = (params, options = {}) => {
        const updatedParams = new URLSearchParams(searchParams);

        if (typeof params === "object" && !Array.isArray(params)) {
            Object.entries(params).forEach(([key, value]) => {
                if (value === null || value === undefined || value === "") {
                    updatedParams.delete(key);
                } else {
                    if (Array.isArray(value)) {
                        updatedParams.set(key, value.join(","));
                    } else {
                        updatedParams.set(key, value);
                    }
                }
            });
        }

        setSearchParams(updatedParams, options);
    };

    const removeQuery = (keys, options = {}) => {
        const updatedParams = new URLSearchParams(window.location.search);

        if (Array.isArray(keys)) {
            keys.forEach((key) => updatedParams.delete(key));
        } else if (typeof keys === "string") {
            updatedParams.delete(keys);
        } else {
            console.error("Invalid input: 'keys' should be a string or an array of strings.");
            return;
        }

        setSearchParams(updatedParams, options);
    };



    const clearQuery = () => {
        setSearchParams({});
    };

    return {
        getQuery,
        setQuery,
        removeQuery,
        clearQuery,
    };
};

export default useQuery;
