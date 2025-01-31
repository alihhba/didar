import React, {useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import FixedMenu from './FixedMenu';

const NavigationLayout = () => {
    const navigate = useNavigate();


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [navigate , location.pathname]);


    return (
        <div className="h-full flex flex-col min-h-[100dvh] grow bg-white-500 dark:bg-dark-dark1">
            <div className="relative h-full dark:bg-dark-dark1 grow  flex flex-col">
                {/* main */}
                <Outlet/>
            </div>

            {/* fixed menu for mobile */}
            <div
                className="sticky mt-auto bottom-0 drop-shadow-xl border-t drop-shadow-1 z-10 bg-white ">
                <FixedMenu/>
            </div>
        </div>
    );
};

export default NavigationLayout;
