import React from 'react';
import images from "@/lib/utils/images.js";

const Splash = () => {
    return (
        <div className={'flex min-h-[100dvh]  relative items-center justify-center w-full h-full'}>
            <div className={'fade-in_900 absolute z-[3]'}>
                <img src={images.splash_1} className={'w-fit h-fit'} alt=""/>
            </div>

            <div className={'fade-in_1800  absolute'}>
                <img src={images.splash_2} className={'w-fit h-fit'} alt=""/>
            </div>


            <div className={'fade-in_2700 absolute z-[4]'}>
                <img src={images.splash_3} className={'w-fit h-fit'} alt=""/>
            </div>

            <div className={'fade-in_3600 absolute z-[2]'}>
                <img src={images.splash_4} className={'w-fit h-fit'} alt=""/>
            </div>

            <div className={'fade-in_4500 absolute z-[2] -me-[75px] mt-5'}>
                <img src={images.splash_11} className={'w-fit h-fit'} alt=""/>
            </div>


        </div>
    );
};

export default Splash