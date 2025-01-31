import React from 'react';
import icons from "@/lib/utils/icons.js";
import {cn} from "@/lib/utils/index.jsx";
import Icon from "@/components/icons/Icon.jsx";
import {useModal} from "@/context/modalContext.jsx";
import {useNavigate} from "react-router-dom";

const ProfileItems = ({items}) => {
    const {changeModalHandler} = useModal();
    const navigate = useNavigate();

    const profileItems = [
        ...items,
        {
            id: 'logout',
            label: 'خروج',
            icon: icons.loguot,
            onclick: () => {
                changeModalHandler({isModal: true, modalType: 'logout'})
            }
        }
    ]
    return (
        <div className={'bg-white p-4  rounded-3xl'}>
            {profileItems.map((item) => {
                return (
                    <div
                        onClick={() => {
                            item?.onclick && item.onclick();
                            item?.path && navigate(item.path)
                        }}
                        className={cn('flex items-center justify-between w-full border-b last:border-none border-gray-200 py-4 last:pb-0 first:pt-0')}>
                        <div className={'flex items-center gap-x-2'}>
                            <Icon icon={item.icon} className={cn('w-6 h-6 text-gray-900')}/>
                            <p className={cn('', item?.id === 'logout' && 'text-red-500')}>
                                {item.label}
                            </p>
                        </div>

                        <div>
                            <Icon icon={icons.chevron_left}
                                  className={cn('w-1.5 h-1.5 ', item?.id === 'logout' && 'text-red-500')}/>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default ProfileItems