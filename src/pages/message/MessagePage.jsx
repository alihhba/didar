import React, {useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import useGetTicketById from "@/hooks/useGetTicketById.jsx";
import Page from "@/layouts/page/Page.jsx";
import Icon from "@/components/icons/Icon.jsx";
import icons from "@/lib/utils/icons.js";
import CustomInput from "@/components/ui/CustomInput.jsx";
import Button from "@/components/ui/Button.jsx";
import Loading from "@/components/Loading.jsx";
import {cn} from "@/lib/utils/index.jsx";
import DateFormatter from "@/components/DateFormatter.jsx";
import images from "@/lib/utils/images.js";
import usePostTicket from "@/hooks/usePostTicket.jsx";
import usePostNewTicket from "@/hooks/usePostNewTicket.jsx";


const MessageTextBox = ({data}) => {
    return (
        <div className={cn('flex flex-col relative   gap-y-2 px-2 pt-2 w-[90%] ' , data?.is_mine ? 'bg-tint_main-700 rounded-e-md' :  'bg-tint_main-200 rounded-s-md ms-auto')}>
            <p className={'text-md font-normal text-main-900'}>{data?.message}</p>
            <div className={'ms-auto pe-2 pb-1'}>
                <DateFormatter className={'text-sm font-normal text-main-400'} dateInput={data?.created} formatType={'timeFullDateSlash'} />
            </div>
        </div>
    )
}




const MessagePage = () => {
    const {id} = useParams();
    const {pathname} = useLocation();
    const {ticket  , loading  , refetch} = useGetTicketById(id);
    const [messageValue, setMessageValue] = useState("");
    const navigate = useNavigate();
    const { loading:postLoading ,  postTicket } = usePostTicket(ticket?.data?.id);
    const {postTicket:postNewTicket} = usePostNewTicket()

    const isNew = pathname.split('/').pop() === 'new';

    const handleSubmit = async () => {
        try {
            if(isNew){
                const payload = { message: messageValue  , instructor:+id , title: messageValue };
                await postNewTicket(payload);
            }else{
            const payload = { message: messageValue };
            await postTicket(payload);
            navigate('/messages')
            }
            refetch();
            setMessageValue('')
        } catch (err) {
            console.error('Error posting ticket:', err);
        }
    };

    if(loading) return <Loading/>

    return (
        <Page>

            <Page.Header>
                <div className={'flex items-center gap-2'}>
                    <div>
                        <Icon
                            onClick={()=>{
                                navigate(-1)
                            }}
                            icon={icons.chevron_left} className={'w-2 h-2 rotate-180'}/>
                    </div>

                    <div className={'flex items-center gap-2'}>
                        <img src={ticket?.data?.instructor?.profile_photo || images.default_avatar}
                             className={'w-14 h-14 min-h-14 min-w-14 rounded-full'} alt=""/>
                        <p className={'text-lg font-semibold text-gray-900'}>{ticket?.data?.instructor?.name || <span>{ticket?.data?.user?.first_name}{ticket?.data?.user?.last_name}</span>}</p>
                    </div>

                </div>
            </Page.Header>


            <Page.Content className={'px-4'}>
                <div className={'w-full h-full flex flex-col grow gap-y-6'}>

                    <div className={'h-full flex flex-col justify-end  grow overflow-y-auto pb-20 '}>
                        <div className={'mt-auto flex flex-col gap-5 '}>
                            {ticket?.data?.messages?.map((item, index) => {
                                return (
                                    <div className={'w-full'} key={index}>
                                        <MessageTextBox data={item}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/*input box*/}
                    <div className={'w-full mt-auto fixed  bottom-24 px-2 right-0 left-0'}>
                        <CustomInput
                            className={'h-[60px]'}
                            placeholder={'نوشتن پیام'}
                            value={messageValue}
                            onChange={(e) => {
                                setMessageValue(e.target.value);
                            }}
                        />

                        <div className={'absolute end-2 top-0.5 me-2'}>
                            <div className={'w-full py-2'}>
                                <Button
                                    onClick={handleSubmit}
                                    style={'primary'}
                                    className={'h-[44px] w-[44px] flex items-center justify-center'}>
                                    <Icon icon={icons.send} className={'w-5 h-5'}/>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Page.Content>
        </Page>
    );
};

export default MessagePage