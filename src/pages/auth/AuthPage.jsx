import React from 'react';
import {cn} from "@/lib/utils/index.jsx";
import images from "@/lib/utils/images.js";
import Page from "@/layouts/page/Page.jsx";
import {Form} from "@/components/form/Form.jsx";
import Button from "@/components/ui/Button.jsx";
import z from 'zod'
import {useNavigate} from "react-router-dom";

const AuthPage = () => {
    const navigate = useNavigate();

    const schema = z.object({
        shenase: z.string().min(1),
        password: z.string().min(1)
    })

    const handleSubmit = (value) => {
        localStorage.setItem('register', true);
        navigate('/home')
    }

    return (
        <Page className={'flex items-center justify-center bg-black min-h-[100dvh] '}>
            <Page.Content className={'flex gap-4 w-full  auth-gradient'}>
                <div className={cn('w-[100px] h-[100px] mx-auto')}>
                    <img src={images.logo} alt="logo" className={'w-full h-full'}/>
                </div>

                <div className={'bg-[#e7e9f9] px-4 py-6 rounded-md border w-full  border-white'}>
                    <div className={'text-center'}>
                        <p className={'text-xl font-medium text-gray-900'}> ورود</p>
                        <p className={'text-sm font-medium text-gray-700 mt-2'}>شناسه و رمز بهشتی خود را برای ورود وارد
                            کنید.</p>
                    </div>

                    <div className={'mt-8'}>
                        <Form schema={schema} onSubmit={handleSubmit}>
                            <Form.Field name={'shenase'} label={'شناسه بهشتی'}>
                                <Form.Input placeholder={'a.bcde'} dir={'ltr'}/>
                            </Form.Field>

                            <Form.Field name={'password'} label={'رمز عبور'}>
                                <Form.Input placeholder={'****'} type='password' dir={'ltr'}/>
                            </Form.Field>

                            <Button style={'primary'} className={'mt-6'}>
                                ورود
                            </Button>
                        </Form>

                    </div>
                </div>
            </Page.Content>
        </Page>
    );
};

export default AuthPage