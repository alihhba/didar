import React from 'react';
import Button from "@/components/ui/Button.jsx";
import { useModal } from "@/context/modalContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getCookie} from "@/hooks/useCookie.jsx";

const LogoutModal = () => {
    const { changeModalHandler } = useModal();
    const navigate = useNavigate();
    const csrfToken = getCookie("csrftoken");
    const token = JSON.parse(localStorage.getItem('user-data'))?.access;

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8888/api/v1/auth/logout/",  {
                refresh: JSON.parse(localStorage.getItem('user-data'))?.refresh,
            },
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": csrfToken,
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("خروج با موفقیت انجام شد");
        } catch (error) {
            console.error("Error during logout:", error);
            let errorMessage = "خطا در خروج";
            if (axios.isAxiosError(error) && error.response && error.response.data?.message) {
                errorMessage = error.response.data.message;
            }
            toast.error(errorMessage);
        } finally {
            localStorage.removeItem('user-data');
            changeModalHandler({ isModal: false });
            navigate('/');
        }
    };

    return (
        <div className="flex flex-col gap-6 pb-6">
            {/* ToastContainer is required to render toast notifications */}
            <ToastContainer />

            <p className="text-h4 font-bold text-error-500 mx-auto pt-6">
                خروج از دیدار
            </p>
            <p className="text-h7 text-gray-700 text-center">
                در صورت عدم نیاز به استفاده از سامانه، لطفا خروج خود را تایید فرمایید.
            </p>
            <div className="flex w-full gap-3">
                <Button
                    style={'primary'}
                    className='bg-red-500'
                    onClick={handleLogout}
                >
                    خروج
                </Button>
                <Button
                    style={'primary'}
                    onClick={() => changeModalHandler({ isModal: false })}
                >
                    لغو
                </Button>
            </div>
        </div>
    );
};

export default LogoutModal;
