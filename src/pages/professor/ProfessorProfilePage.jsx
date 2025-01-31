import React from 'react';
import Page from "@/layouts/page/Page.jsx";
import ProfileInfo from "@/components/profile/ProfileInfo.jsx";
import ProfileItems from "@/components/profile/ProfileItems.jsx";
import icons from "@/lib/utils/icons.js";
import images from "@/lib/utils/images.js";

const ProfessorProfilePage = () => {
    const data = {
        name: 'مونا حفارمجرد',
        orientation: 'مهندسی کامپیوتر',
    }

    const items = [
        {
            id: 1,
            label: 'پیام های من',
            icon: icons.message,
            path:'/messages'
        },
        {
            id: 1,
            label: 'افزودن رویداد',
            icon: icons.tasks ,
            path:'/tasks'
        }
    ]


    return (
        <Page>
            <Page.Header/>
            <Page.Content>
                <div>
                    <ProfileInfo icon={images.profile_professor_vector} data={data}/>
                </div>

                <div className={'mt-[64px]'}>
                    <ProfileItems items={items}/>
                </div>

            </Page.Content>
        </Page>
    );
};

export default ProfessorProfilePage