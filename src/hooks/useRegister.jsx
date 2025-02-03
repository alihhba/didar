import { useEffect } from 'react';
import { useSplash } from '@/hooks/useSplash.jsx';
import { useLocation } from 'react-router-dom';

const UseRegister = () => {
    const { isSplash, navigateTo } = useSplash(5400);
    const location = useLocation();
    const isRegister = JSON.parse(localStorage.getItem('user-data'))?.access || false;

    const allowedRoutesForUnregistered = ['/auth'];
    const isCurrentRouteAllowed = allowedRoutesForUnregistered.includes(location.pathname);

    useEffect(() => {
        if (!isSplash) {
            if (!isRegister && !isCurrentRouteAllowed) {
                navigateTo('/auth');
            } else if (isRegister && isCurrentRouteAllowed) {
                navigateTo('/home');
            }
        } else {
            navigateTo('/home');
        }
    }, [isSplash, navigateTo, isRegister , location.pathname]);


    return {
        isRegister,
        isSplash
    };
};

export default UseRegister;