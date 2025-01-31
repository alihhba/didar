import React from 'react';
import images from "@/lib/utils/images.js";
import {cn} from "@/lib/utils/index.jsx";

const Avatar = ({img , className}) => {
    return (
        <div
            className={cn('w-16 h-16 min-w-16 min-h-16 max-w-16 max-h-16 border-2 border-main-1100 rounded-full overflow-hidden' , className)}>
            <img src={ img || images.default_avatar} alt=""/>
        </div>
    );
};

export default Avatar