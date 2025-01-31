import React from 'react';
import Page from "@/layouts/page/Page.jsx";
import icons from "@/lib/utils/icons.js";
import Icon from "@/components/icons/Icon.jsx";
import {useNavigate} from "react-router-dom";
import ProfessorInfoCard from "@/components/card/ProfessorInfoCard.jsx";
import InfoBox from "@/components/box/InfoBox.jsx";
import images from "@/lib/utils/images.js";




const ProfessorPage = () => {
    const navigate = useNavigate();

    const data = {
        firstName: 'فرشاد',
        lastName: 'صفائی سمنانی',
        academicRank: 'دانشیار',
        department: 'معماری کامپیوتر و شبکه',
        faculty: " مهندسی و علوم کامپیوتر",
        roomNumber: '302',
        email: 'f_safaei@sbu.ac.ir',
        phone: '۲۹۹۰۴۱۸۳',
        bio: 'مدلسازی سامانه‌های کامپیوتری\n' +
            'سامانه‌های پیشرفته حافظه\n' +
            'شبکه‌های پیچیده',
        image: images.avatar_1
    }

    return (
        <Page>
            <Page.Header>
                <Icon
                    onClick={() => {
                        navigate(-1, {replace: true});
                    }}
                    icon={icons.back} className={'w-6 h-6'}/>
            </Page.Header>
            <Page.Content>
                <div>
                    <ProfessorInfoCard data={data}/>
                </div>


                <div className={'grid grid-cols-2 items-center gap-x-2 mt-6 '}>
                    <InfoBox title={'تماس'} icon={icons.phone}>
                        <div className={'flex flex-col gap-y-2'}>

                        <p className={'text-sm font-normal text-gray-700'}>
                            <span
                                className={'text-sm font-semibold text-gray-800'}>شماره تماس:</span>{data?.phone}</p>
                        <p className={'text-sm font-normal text-gray-700'}>
                            <span
                                className={'text-sm font-semibold text-gray-800'}>ایمیل:</span> {data?.email}</p>
                        </div>
                    </InfoBox>
                    <InfoBox title={'علایق پژوهشی'} icon={icons.search_book}>
                        <p className={'text-sm/6 text-gray-700 font-normal'}>

                        {data?.bio}
                        </p>
                    </InfoBox>
                </div>

            </Page.Content>
        </Page>
    );
};

export default ProfessorPage