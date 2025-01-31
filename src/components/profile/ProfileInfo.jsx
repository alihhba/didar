import React from 'react';
import UserInfo from "@/components/userInfo/UserInfo.jsx";
import images from "@/lib/utils/images.js";

const ProfileInfo = ({data , icon}) => {


    return (
        <div className={'bg-white p-4 relative rounded-3xl overflow-hidden'}>
            <UserInfo
                data={data}
                avatarClass={'border-none w-[86px] h-[86px] min-w-[86px] min-h-[86px] '}
                nameClass={'text-[18px]'}
            />

            <div className={'absolute left-0 bottom-0'}>
                <img src={icon} alt="profile" className={'w-full h-full'}/>
            </div>
        </div>
    );
};

export default ProfileInfo