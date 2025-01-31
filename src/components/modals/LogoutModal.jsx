import React from 'react';
import Button from "@/components/ui/Button.jsx";
import {useModal} from "@/context/modalContext.jsx";
import {useNavigate} from "react-router-dom";

const LogoutModal = () => {
    const {changeModalHandler}  = useModal();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-6 pb-6">
            <p className="text-h4 font-bold text-error-500 mx-auto pt-6">{'خروج از دیدار'}</p>
            <p className="text-h7  text-gray-700 text-center ">در صورت عدم نیاز به استفاده از سامانه، لطفا خروج خود را تایید فرمایید.</p>
            <div className="flex w-full gap-3">
                <Button style={'primary'}
                        className='bg-red-500'
                        onClick={() => {
                    localStorage.removeItem('register');
                    changeModalHandler({isModal: false});
                    navigate('/');
                }} >خروج</Button>
                <Button style={'primary'} onClick={() => {
                    changeModalHandler({isModal: false});
                }} >لغو</Button>
            </div>
        </div>
    );
};

export default LogoutModal