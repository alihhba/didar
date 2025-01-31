import React from 'react';
import {cn} from "@/lib/utils/index.jsx";
import UserInfo from "@/components/userInfo/UserInfo.jsx";
import Tag from "@/components/tag/Tag.jsx";
import {useNavigate} from "react-router-dom";

const ProfessorCard = ({data, type = 'primary', className, ...props}) => {
    const {name, image, orientation, academic_rank , id} = data || {};
    const navigate = useNavigate();

    if (type === 'primary') {
        return (
            <div
                onClick={()=>{
                    navigate(`/professor/${id}`)
                }}
                className={cn('flex p-4 items-center justify-between w-full rounded-xl overflow-hidden bg-white border border-gray-400', className)} {...props}>
                <UserInfo data={{name, image, orientation}}/>

                <div className={'h-16 py-1.5'}>
                    <Tag>
                        {academic_rank}
                    </Tag>
                </div>
            </div>
        );
    }


    if (type === 'secondary') {
        return (
            <div
                onClick={()=>{
                    navigate(`/professor/${id}`)
                }}
                className={cn('p-4 min-w-max w-44 bg-white flex flex-col items-center justify-start rounded-3xl overflow-hidden border border-gray-300', className)} {...props}>
                <div className={'w-30 h-30  rounded-xl overflow-hidden'}>
                    <img src={image} alt="avatar" className={'w-full h-full'}/>
                </div>

                <div className={'mt-4 flex flex-col gap-4'}>
                    <p className={'text-gray-900 font-medium text-md'}>{name}</p>
                    <p className={'text-sm font-normal text-gray-700'}>{orientation}</p>
                </div>

            </div>
        )
    }
};

export default ProfessorCard