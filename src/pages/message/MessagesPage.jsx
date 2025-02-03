import React from 'react';
import Page from "@/layouts/page/Page.jsx";
import Icon from "@/components/icons/Icon.jsx";
import icons from "@/lib/utils/icons.js";
import {useNavigate} from "react-router-dom";
import useGetTickets from "@/hooks/useGettickets.jsx";
import MessageCard from "@/components/messages/MessageCard.jsx";
import Loading from "@/components/Loading.jsx";

const MessagesPage = () => {
    const {tickets , loading} = useGetTickets();
    const navigate = useNavigate();

    if(loading) return <Loading/>

    return (
        <Page>
            <Page.Header >
             <div className={'flex items-center gap-2.5'}>
                 <Icon onClick={()=>{
                     navigate(-1 , {replace: true})
                 }} icon={icons.back} className={'w-6 h-6'} />
                 <p className='text-gray-900 text-xl font-semibold'>پیام ها</p>
             </div>
            </Page.Header>
            <Page.Content className={'bg-white pt-0'}>
                {
                    tickets?.data?.results?.length === 0 ?
                        (<div  className={'w-full text-center'}>وردی یافت نشد</div>)
                        :
                        (<div>
                            {tickets?.data?.results?.map((item, i) => {
                                return(
                                    <MessageCard key={i} data={item}/>
                                )
                            })}
                        </div>)
                }
            </Page.Content>
        </Page>
    );
};

export default MessagesPage