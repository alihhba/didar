import React from 'react';
import Page from "@/layouts/page/Page.jsx";
import Icon from "@/components/icons/Icon.jsx";
import icons from "@/lib/utils/icons.js";
import {replace, useNavigate} from "react-router-dom";

const MessagesPage = () => {
    const navigate = useNavigate()
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
            <Page.Content>
                messages
            </Page.Content>
        </Page>
    );
};

export default MessagesPage