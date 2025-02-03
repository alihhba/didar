import React from 'react';
import Page from "@/layouts/page/Page.jsx";
import icons from "@/lib/utils/icons.js";
import Icon from "@/components/icons/Icon.jsx";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import ProfessorInfoCard from "@/components/card/ProfessorInfoCard.jsx";
import InfoBox from "@/components/box/InfoBox.jsx";
import useGetInstructorById from "@/hooks/useGetInstructorById.jsx";
import WeekGunChartCalender from "@/components/calenders/WeekGunChartCalender.jsx";
import useGetTasksByInstructorId from "@/hooks/useGetTasksByInstructorId.jsx";


const ProfessorPage = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {id} = useParams();
    const professorData = state?.data;
    const {instructor } = useGetInstructorById(id)
    const {tasks} = useGetTasksByInstructorId(id)
    // title: "test 1", start: "2025-02-02T09:00", end: "2025-02-02T11:00"

    const tasksData = tasks?.data?.results.map((a)=>{
        return ({
            title: a?.title,
            start:`1900-02-02T${a?.start_time}`,
            end:`1900-02-02T${a?.end_time}`,
            day_of_week:a?.day_of_week
        })
    })

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
                    <ProfessorInfoCard data={{...instructor,...professorData}}/>
                </div>


                <div className={'grid grid-cols-2 items-center gap-x-2 mt-6 '}>
                    <InfoBox title={'تماس'} icon={icons.phone}>
                        <div className={'flex flex-col gap-y-2'}>

                            <p className={'text-sm font-normal text-gray-700'}>
                            <span
                                className={'text-sm font-semibold text-gray-800'}>شماره تماس:</span>{instructor?.data?.room_phone}</p>
                            <p className={'text-sm font-normal text-gray-700'}>
                            <span
                                className={'text-sm font-semibold text-gray-800'}>ایمیل:</span> {instructor?.data?.email}</p>
                        </div>
                    </InfoBox>
                    <InfoBox title={'علایق پژوهشی'} icon={icons.search_book}>
                        <p className={'text-sm/6 text-gray-700 font-normal'}>

                            {instructor?.data?.bio}
                        </p>
                    </InfoBox>
                </div>

                <div className={'mt-6 border border-gray-200 rounded-md'}>
                    <WeekGunChartCalender calenderType={'fa'} tasksData={tasksData}/>
                </div>

            </Page.Content>
        </Page>
    );
};

export default ProfessorPage