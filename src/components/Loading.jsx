import React from 'react';
import {Loader2} from "lucide-react";

const Loading = () => {
    return (
        <div className={'w-full h-screen flex items-center justify-center'}>
            <Loader2 className={'w-7 h-7 animate-spin '}/>
        </div>
    );
};

export default Loading