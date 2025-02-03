import React, {useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Page from "@/layouts/page/Page.jsx";
import Icon from "@/components/icons/Icon.jsx";
import icons from "@/lib/utils/icons.js";
import CustomInput from "@/components/ui/CustomInput.jsx";
import Button from "@/components/ui/Button.jsx";
import usePostNewTicket from "@/hooks/usePostNewTicket.jsx";


const NewMessageText = () => {
    const {state} = useLocation();
    const {id} = useParams();
    const [messageValue, setMessageValue] = useState("");
    const [titleValue, setTitleValue] = useState("");

    const navigate = useNavigate();
    const {postTicket: postNewTicket} = usePostNewTicket();


    const handleSubmit = async () => {
        try {

            const payload = {message: messageValue, instructor: +id, title: titleValue};
            await postNewTicket(payload);

            setMessageValue('');
            navigate('/messages')
        } catch (err) {
            console.error('Error posting ticket:', err);
        }
    };


    return (
        <Page>

            <Page.Header>
                <div className={'flex items-center gap-2'}>
                    <div>
                        <Icon
                            onClick={() => {
                                navigate(-1)
                            }}
                            icon={icons.chevron_left} className={'w-2 h-2 rotate-180'}/>
                    </div>

                    <div className={'flex items-center gap-2'}>
                        <img src={state?.data?.profile_photo}
                             className={'w-14 h-14 min-h-14 min-w-14 rounded-full'} alt=""/>
                        <p className={'text-lg font-semibold text-gray-900'}>{state?.data?.name}</p>
                    </div>

                </div>
            </Page.Header>


            <Page.Content className={'px-4'}>
                <div className={'w-full h-full flex flex-col grow gap-y-6'}>
                    <div className={'space-y-2'}>
                        <CustomInput
                            className={'h-[60px]'}
                            placeholder={'موضوع'}
                            value={titleValue}
                            onChange={(e) => {
                                setTitleValue(e.target.value);
                            }}
                        />
                        <CustomInput
                            className={'h-[60px]'}
                            placeholder={' پیام'}
                            value={messageValue}
                            onChange={(e) => {
                                setMessageValue(e.target.value);
                            }}
                        />
                    </div>


                    <div className={'w-full mt-auto fixed  bottom-24 px-2 right-0 left-0'}>
                        <div className={'w-full'}>
                            <div className={'w-full py-2'}>
                                <Button
                                    onClick={handleSubmit}
                                    style={'primary'}
                                    className={'h-[44px] w-full flex items-center justify-center'}>
                                    ارسال
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Page.Content>
        </Page>
    );
};

export default NewMessageText