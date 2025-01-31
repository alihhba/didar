import React from 'react';
import {cn} from "@/lib/utils/index.jsx";

const Button = ({children , className , style , ...props}) => {
    const styleType  = {
        primary : 'bg-main-900'
    }
    return (
        <button  className={cn('h-12 w-full text-xl text-white rounded-md'  , styleType[style] , className)} {...props}>
            {children}
        </button>
    );
};

export default Button