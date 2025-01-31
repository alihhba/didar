import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useSplash = (duration = 2000) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [isSplash, setIsSplash] = useState(pathname.split('/')[1].length === 0);

    useEffect(() => {
        if (isSplash) {
            const timer = setTimeout(() => {
                setIsSplash(false);
            }, duration);
            return () => clearTimeout(timer);
        } else {
            setIsSplash(false);
        }
    }, [navigate, isSplash]);

    const navigateTo = useCallback((path) => navigate(path), [navigate]);


    return { isSplash, navigateTo };
};
