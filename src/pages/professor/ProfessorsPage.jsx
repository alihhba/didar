import React, {useEffect} from 'react';
import Page from "@/layouts/page/Page.jsx";
import Icon from "@/components/icons/Icon.jsx";
import images from "@/lib/utils/images.js";
import icons from "@/lib/utils/icons.js";
import {useModal} from "@/context/modalContext.jsx";
import ProfessorCard from "@/components/card/ProfessorCard.jsx";
import CustomSearchBox from "@/components/ui/CustomSearchBox.jsx";
import useQuery from "@/hooks/useQuery.jsx";
import useFetchData from "@/hooks/useFetchData.jsx";
import Loading from "@/components/Loading.jsx";

const ProfessorsPage = () => {
    const {changeModalHandler} = useModal();
    const {getQuery} = useQuery();
    const q = getQuery('q') || '';

    const {data: instructor, loading, refetch} = useFetchData('http://localhost:8888/api/v1/instructors/', {
        params: {
            department__faculty: getQuery('department__faculty'),
            department: getQuery('department'),
        }
    });

    useEffect(() => {
        refetch();
    }, [
        getQuery('department'), getQuery('department__faculty')
    ])

    if (loading) return <Loading/>;

    return (
        <Page>
            <Page.Header>
                <div className={'flex flex-col gap-2'}>
                    <Icon icon={images.logo_name} className={'w-full h-full text-gray-900'}/>
                    <div className={'flex w-full items-center  gap-x-4'}>
                        <button onClick={() => {
                            changeModalHandler({isModal: true, modalType: 'professors-filters'})
                        }}>
                            <Icon icon={icons.filters} className={'w-5 h-5 text-gray-900'}/>
                        </button>
                        <CustomSearchBox/>
                    </div>

                </div>

            </Page.Header>
            <Page.Content>
                <div>
                    <div className={'flex flex-col gap-2'}>
                        {instructor?.data?.results?.length === 0 ?
                            <div className={'w-full text-center'}>موردی یافت نشد.</div>
                            : instructor?.data?.results.filter(p => p.name?.toLowerCase().includes(q?.toString()?.toLowerCase())).map((item) => {
                                return (
                                    <ProfessorCard data={item}/>
                                )
                            })}
                    </div>
                </div>
            </Page.Content>
        </Page>
    );
};

export default ProfessorsPage