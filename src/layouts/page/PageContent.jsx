import React from 'react';
import {cn} from "@/lib/utils/index.jsx";

const PageContent = ({children , className , ...props}) => {
    return (
        <div className={cn('flex flex-col h-full grow py-4 pt-6 bg-tint_main-100  px-6 ' , className)} {...props}>
            {children}
        </div>
    );
};




export default PageContent