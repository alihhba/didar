import React from 'react';
import WeekGunChartCalender from "@/components/calenders/WeekGunChartCalender.jsx";
import Page from "@/layouts/page/Page.jsx";
import Icon from "@/components/icons/Icon.jsx";
import icons from "@/lib/utils/icons.js";
import SectionTitle from "@/components/sectionTitle/SectionTitle.jsx";

const TasksPage = () => {
    return (
        <Page>
            <Page.Header/>




            <Page.Content>

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