import React from 'react';
import {cn} from "@/lib/utils/index.jsx";
import Avatar from "@/components/avatar/Avatar.jsx";
import Icon from "@/components/icons/Icon.jsx";
import icons from "@/lib/utils/icons.js";
import {useNavigate} from "react-router-dom";

const UserInfo = ({data, className, nameClass, avatarClass, ...props}) => {
    const {name, profile_photo: image} = data || {};
    const navigate = useNavigate();

    console.log(data)
    return (
        <div className={cn('flex items-center gap-4 h-full', className)} {...props}>
            <div>
                <Avatar img={image} className={avatarClass}/>
            </div>
            <div className={'flex flex-col py-1.5 items-start text-start justify-start gap-3  h-16 '}>
                <div className={'flex items-center gap-x-2'}>

                <p className={cn('text-gray-900 w-fit text-start font-medium text-md', nameClass)}>{name ||
                    <span className={'text-gray-900 w-fit text-start font-medium text-md'}>
                    {data?.data?.first_name}{data?.data?.last_name}
                </span>}</p>

                    {data?.data?.is_instructor?
                    <div>
                        <Icon
                            onClick={()=>{
                                navigate('/auth/edit')
                            }}
                            icon={icons.edit}/>
                    </div>
                        : null}
                </div>
                <p className={'text-sm font-normal text-gray-700'}>{data?.facility?.faculty?.name || data?.data?.department?.name || data?.data?.instructor?.department?.name}</p>
            </div>

        </div>
    );
};

export default UserInfo