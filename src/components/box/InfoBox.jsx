import React from 'react';
import {cn} from "@/lib/utils/index.jsx";
import Icon from "@/components/icons/Icon.jsx";
import images from "@/lib/utils/images.js";

const InfoBox = ({children , title , icon , className , ...props}) => {
    return (
        <div className={cn('w-full h-full grow relative p-4 rounded-xl overflow-hidden  bg-tint_main-200 ' , className)} {...props}>
            <div className={'flex items-center gap-x-2 '
            }>
                <Icon icon={icon} className={'w-6 h-6 text-tint_main-1300'}/>
                <p className={'text-tint_main-1300 text-[14px] font-bold'}>{title}</p>
            </div>

            <div className={'mt-4'}>
            {children}
            </div>

            <div className={'absolute -top-5 -left-6'}>
                <img src={images.logo_2} alt="logo" className={'w-20 h-20 opacity-20 -rotate-45'}/>

            </div>
        </div>
    );
};

export default InfoBox