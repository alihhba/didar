import React from 'react';
import {cn} from "@/lib/utils/index.jsx";
import images from "@/lib/utils/images.js";
import Tag from "@/components/tag/Tag.jsx";
import Button from "@/components/ui/Button.jsx";
import icons from "@/lib/utils/icons.js";
import Icon from "@/components/icons/Icon.jsx";
import {useNavigate, useParams} from "react-router-dom";

const ProfessorInfoCard = ({data, className, ...props}) => {
    const {id } = useParams();
    const navigate = useNavigate();
    const {
        name: firstName,
        lastName,
        rank: academicRank,
        profile_photo: image
    } = data || {}


    return (
        <div
            className={cn('p-4 w-full  bg-white flex flex-col  rounded-xl overflow-hidden border border-gray-300', className)} {...props}>

            <div className={'flex items-center grow  '}>
                <div className={'w-30 min-h-30 min-w-30 me-6  h-30  rounded-xl overflow-hidden '}>
                    <img src={image || images.default_avatar} alt={firstName} className={'w-full h-full'}/>
                </div>

                <div className={'flex  flex-col gap-y-2 justify-between h-30 grow'}>
                    <p className={'line-clamp-1 text-[1rem]  text-gray-900  font-medium'}>{firstName} {lastName}</p>
                    <p className={'text-sm font-normal text-gray-700'}><span
                        className={'text-sm font-semibold text-gray-800'}>دانشکده:</span>{data?.data?.department?.faculty?.name}
                    </p>
                    <p className={'text-sm font-normal text-gray-700'}><span
                        className={'text-sm font-semibold text-gray-800'}> گروه آموزشی:</span> {data?.data?.department?.name}
                    </p>
                    <div className={'flex items-center gap-x-2'}>
                        {academicRank ? (
                            <Tag>{academicRank}</Tag>
                        ) : null}
                        {data?.data?.room_number ? (
                            <Tag>
                                <div className={'flex items-center gap-1'}>
                                    <span>اتاق</span> {data?.data?.room_number}
                                </div>
                            </Tag>
                        ) : null}

                    </div>
                </div>

            </div>

            <div className={'mt-6'}>
                <Button
                    onClick={()=>{
                        navigate(`/message/${id}/new`)
                    }}
                    style={'primary'}>
                    <div className={'flex items-center gap-2 justify-center flex-row-reverse'}>
                        <p className={'text-white font-semibold text-[14px]'}>پیام به استاد</p>
                        <Icon icon={icons.message} className={'w-5 h-5'}/>
                    </div>
                </Button>
            </div>
        </div>
    )
};

export default ProfessorInfoCard