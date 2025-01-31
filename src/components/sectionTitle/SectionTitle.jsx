import React from 'react';
import {cn} from "@/lib/utils/index.jsx";
import {useNavigate} from "react-router-dom";
import Icon from "@/components/icons/Icon.jsx";
import icons from "@/lib/utils/icons.js";

const SectionTitle = ({title, path, className, ...props}) => {
    const navigate = useNavigate()
    return (
        <button
            onClick={() => {
                navigate(`/${path}`);
            }}
            className={cn('flex items-center mb-4 border-b pb-2 border-gray-400 justify-between w-full', className)} {...props}>

            <p className={'text-lg text-gray-900 font-medium'}>{title}</p>

            {path ? (
                <div className={'flex items-center gap-2'}>
                    <p className={'text-main-900 font-medium text-md'}>مشاهده همه</p>
                    <Icon  icon={icons.chevron_left} className={'w-1.5 h-1.5'}/>
                </div>
            ) : null}
        </button>
    );
};

export default SectionTitle