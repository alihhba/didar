import React from 'react';
import Page from "@/layouts/page/Page.jsx";
import ProfileInfo from "@/components/profile/ProfileInfo.jsx";
import ProfileItems from "@/components/profile/ProfileItems.jsx";
import icons from "@/lib/utils/icons.js";
import images from "@/lib/utils/images.js";
import useGetMe from "@/hooks/useGetMe.jsx";

const StudentProfilePage = () => {
    const {user} = useGetMe()

    console.log(user)

    const items = [
        {
            id: 1,
            label: 'پیام های من',
            icon: icons.message,
            path:'/messages'
        }
    ]


    return (
        <Page>
            <Page.Header/>
            <Page.Content>
                <div>
                    <ProfileInfo icon={images.profile_info_vector} data={user}/>
                </div>

                <div className={'mt-[64px]'}>
                    <ProfileItems items={items}/>
                </div>

            </Page.Content>
        </Page>
    );
};

export default StudentProfilePage