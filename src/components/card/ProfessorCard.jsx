import React from 'react';
import {cn} from "@/lib/utils/index.jsx";
import UserInfo from "@/components/userInfo/UserInfo.jsx";
import Tag from "@/components/tag/Tag.jsx";
import {useNavigate} from "react-router-dom";
import images from "@/lib/utils/images.js";
import useGetInstructorById from "@/hooks/useGetInstructorById.jsx";

const ProfessorCard = ({data, type = 'primary', className, ...props}) => {
    const {name, profile_photo:profile_image, id , rank} = data || {};
    const {instructor} = useGetInstructorById(id)
    const navigate = useNavigate();

    if (type === 'primary') {
        return (
            <div
                onClick={() => {
                    navigate(`/professor/${id}` , {state: {data}})
                }}
                className={cn('flex p-4 items-center justify-between w-full rounded-xl overflow-hidden bg-white border border-gray-400', className)} {...props}>
                <UserInfo data={{...data,...instructor}}/>

                {rank? (
                    <div className={'h-16 py-1.5'}>
                        <Tag>
                            {rank}
                        </Tag>
                    </div>
                ) : null}
            </div>
        );
    }


    if (type === 'secondary') {
        return (
            <div
                onClick={() => {
                    navigate(`/professor/${id}`)
                }}
                className={cn('max-w-[100px] p-4 min-w-[177px] w-44 bg-white flex flex-col items-center justify-start rounded-3xl overflow-hidden border border-gray-300', className)} {...props}>
                <div className={'w-30 h-30  rounded-xl overflow-hidden'}>
                    <img src={profile_image || instructor?.data?.profile_photo || images.default_avatar} alt="avatar" className={'w-full h-full'}/>
                </div>

                <div className={'mt-4 flex flex-col gap-4 text-center'}>
                    <p className={'text-gray-900 font-medium text-md'}>{name}</p>
                    <p className={'text-sm font-normal text-gray-700'}>{data?.facility?.faculty?.name || instructor?.data?.department?.name}</p>
                </div>

            </div>
        )
    }
};

export default ProfessorCard