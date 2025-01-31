import React from 'react';
import Page from "@/layouts/page/Page.jsx";
import Icon from "@/components/icons/Icon.jsx";
import images from "@/lib/utils/images.js";
import icons from "@/lib/utils/icons.js";
import {useModal} from "@/context/modalContext.jsx";
import ProfessorCard from "@/components/card/ProfessorCard.jsx";
import CustomSearchBox from "@/components/ui/CustomSearchBox.jsx";
import useQuery from "@/hooks/useQuery.jsx";


const professors = [
    {
        id: 1 ,
        name: "فرشاد صفائی سمنانی",
        orientation: "معماری کامپیوتر و شبکه",
        image: images.avatar_1,
        academic_rank: "دانشیار"
    },
    {
        id:2,
        name: "مجتبی وحیدی اصل",
        orientation: "معماری کامپیوتر و شبکه",
        image: images.avatar_1,
        academic_rank: "دانشیار"
    },
    {
        id:3,
        name: "مائده مشرف دهکردی",
        orientation: "معماری کامپیوتر و شبکه",
        image: images.avatar_1,
        academic_rank: "دانشیار"
    },
    {
        id:4,
        name: "فرشاد صفائی سمنانی",
        orientation: "معماری کامپیوتر و شبکه",
        image: images.avatar_1,
        academic_rank: "دانشیار"
    },
    {
        id:5,
        name: "فرشاد صفائی سمنانی",
        orientation: "معماری کامپیوتر و شبکه",
        image: images.avatar_1,
        academic_rank: "دانشیار"
    },
    {
        id:6,
        name: "فرشاد صفائی سمنانی",
        orientation: "معماری کامپیوتر و شبکه",
        image: images.avatar_1,
        academic_rank: "دانشیار"
    },
    {
        id:7,
        name: "فرشاد صفائی سمنانی",
        orientation: "معماری کامپیوتر و شبکه",
        image: images.avatar_1,
        academic_rank: "دانشیار"
    },
    {
        id:8,
        name: "فرشاد صفائی سمنانی",
        orientation: "معماری کامپیوتر و شبکه",
        image: images.avatar_1,
        academic_rank: "دانشیار"
    }
];


const ProfessorsPage = () => {
    const {changeModalHandler} = useModal();
    const {getQuery} = useQuery();
    const  q = getQuery('q') || '';
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
                        {professors.filter(p => p.name.includes(q)).map((item) => {
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