import React from "react";
import Page from "@/layouts/page/Page.jsx";
import SectionTitle from "@/components/sectionTitle/SectionTitle.jsx";
import ProfessorCard from "@/components/card/ProfessorCard.jsx";
import Loading from "@/components/Loading.jsx";
import useFetchData from "@/hooks/useFetchData.jsx";

const HomePage = () => {
    // const {data: facultiesData} = useFetchData('http://localhost:8888/api/v1/faculties/');
    // const {departments} = useFetchDepartmentsByFaculties();
    // const {instructors, error: instructorsError, loading: instructorsLoading} =
    //     useFetchInstructorsByDepartments(departments);
    const {data : instructors, loading : instructorsLoading} = useFetchData( 'http://localhost:8888/api/v1/instructors/')

    if (instructorsLoading) return <Loading/>

    return <Page className={''}>
        <Page.Header/>
        <Page.Content>

            {/*professors*/}
            <SectionTitle path={'professors'} title={'اساتید دانشکده'}/>

            <div className={'flex flex-col gap-2'}>
                {instructors?.data?.results?.slice(0,6)?.map((item)=>{
                    return (
                        <ProfessorCard data={item}/>
                    )
                })}

            </div>
            {/*section two*/}
            <SectionTitle className={'pt-4'} path={'professors'} title={'امروز حضور دارند ...'}/>

            <div className={'w-screen flex gap-2 overflow-x-auto px-6  -mx-6'}>

                {instructors?.data?.results?.slice(0,6)?.map((item)=>{
                    return (
                        <ProfessorCard
                            type={'secondary'}
                            data={item}/>
                    )
                })}
            </div>
        </Page.Content>
    </Page>;
};

export default HomePage;
