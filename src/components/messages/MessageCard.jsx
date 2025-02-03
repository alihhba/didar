import React from 'react';
import useGetTicketById from "@/hooks/useGetTicketById.jsx";
import DateFormatter from "@/components/DateFormatter.jsx";
import {useNavigate} from "react-router-dom";
import images from "@/lib/utils/images.js";

const MessageCard = ({data}) => {
    const {ticket} = useGetTicketById(data?.id);
    const lastMessageData = ticket?.data?.messages?.pop();
    const navigate = useNavigate();

    console.log(ticket)


    return (
        <div
            onClick={()=>{
                navigate(`/message/${ticket?.data?.id}`);
            }}
            className={'flex items-center justify-between w-full border-b border-gray-200 py-5'}>
            <div className={'flex items-center  gap-x-3'}>
                <img src={data?.instructor?.profile_photo || images.default_avatar} className={'rounded-full h-14 w-14 min-w-14 min-h-14'}
                     alt=""/>
                <div className={'justify-between flex flex-col grow h-12'}>
                    <p className={'text-gray-700 text-md font-semibold'}>{data?.instructor?.name || <span>{data?.user?.first_name} {data?.user?.last_name}</span>}</p>
                    <p className={'text-sm font-normal text-gray-500 mt-auto line-clamp-1 '}>{lastMessageData?.message}</p>
                </div>
            </div>

            <div >
                <DateFormatter className={'text-gray-700 text-sm font-medium'} dateInput={lastMessageData?.created} formatType={'timeOnly'}/>
            </div>
        </div>
    );
};

export default MessageCard