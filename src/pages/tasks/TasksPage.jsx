import React from 'react';
import WeekGunChartCalender from "@/components/calenders/WeekGunChartCalender.jsx";
import Page from "@/layouts/page/Page.jsx";
import Icon from "@/components/icons/Icon.jsx";
import icons from "@/lib/utils/icons.js";
import SectionTitle from "@/components/sectionTitle/SectionTitle.jsx";
import WeekEventCard from "@/components/card/WeekEventCard.jsx";
import {useModal} from "@/context/modalContext.jsx";
import useGetTasksByInstructorId from "@/hooks/useGetTasksByInstructorId.jsx";
import useGetMe from "@/hooks/useGetMe.jsx";

const TasksPage = () => {
    const {changeModalHandler} = useModal();
    const {user} = useGetMe();
    const {tasks} = useGetTasksByInstructorId()

    console.log(
        user
    )

    return (
        <Page>
            <Page.Header/>
            <Page.Content>

                <SectionTitle
                    renderStart={()=>{
                        return (
                            <div className={'flex items-center gap-x-2'}>
                                <p>رویدادهای هفته</p>
                            </div>
                        )
                    }}
                    renderEnd={()=>{
                        return (
                            <div
                                onClick={()=>{
                                    changeModalHandler({isModal: true , modalType: 'add-edit-event'})
                                }}
                                className={'flex items-center gap-x-1'}>
                                <p>افزودن</p>
                                <Icon icon={icons.plus} className={'w-4 h-4 text-gray-600'}/>
                            </div>
                        )
                    }}

                />

                <div className={'w-full  flex gap-2 overflow-x-auto pb-4'}>
                    <WeekEventCard/>
                    <WeekEventCard/>
                    <WeekEventCard/>
                    <WeekEventCard/>
                </div>


                <SectionTitle
                    renderStart={()=>{
                    return (
                        <div className={'flex items-center gap-x-2'}>
                            <Icon icon={icons.edit} className={'w-5 h-5 text-gray-600'}/>
                            <p>زمانبندی من</p>
                        </div>
                    )
                }}
                renderEnd={()=>{
                    return (
                        <div className={'flex items-center gap-x-1'}>
                            <p>افزودن</p>
                            <Icon icon={icons.plus} className={'w-4 h-4 text-gray-600'}/>
                        </div>
                    )
                }}

                />
                <div className={' border border-gray-200 rounded-md'}>
                    <WeekGunChartCalender calenderType={'fa'}/>
                </div>
            </Page.Content>
        </Page>
    );
};

export default TasksPage