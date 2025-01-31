import React from 'react';
import {cn} from "@/lib/utils/index.jsx";

const Tag = ({className, type = 'primary', children, ...props}) => {
    const typeStyle = {
        primary: 'bg-tint_main-1000  bg-opacity-20  text-main-500',
    }

    return (
        <div className={cn('py-1 text-sm font-normal px-2.5 rounded-lg ', typeStyle[type], className)} {...props}>
            {children}
        </div>
    );
};

export default Tag