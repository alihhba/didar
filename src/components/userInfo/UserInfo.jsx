import React from 'react';
import {cn} from "@/lib/utils/index.jsx";
import Avatar from "@/components/avatar/Avatar.jsx";

const UserInfo = ({data  , className ,nameClass   , avatarClass , ...props}) => {
   const {name , image  , orientation} = data || {};
    return (
        <div className={cn('flex items-center gap-4 h-full'  , className)} {...props}>
            <div>
                <Avatar img={image} className={avatarClass} />
            </div>
            <div className={'flex flex-col py-1.5 items-center justify-center gap-3  h-16 '}>
                <p className={cn('text-gray-900 font-medium text-md' , nameClass)}>{name}</p>
                <p className={'text-sm font-normal text-gray-700'}>{orientation}</p>
            </div>
        </div>
    );
};

export default UserInfo