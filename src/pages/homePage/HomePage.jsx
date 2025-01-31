import React from "react";
import Page from "@/layouts/page/Page.jsx";
import SectionTitle from "@/components/sectionTitle/SectionTitle.jsx";
import UserInfo from "@/components/userInfo/UserInfo.jsx";
import images from "@/lib/utils/images.js";
import ProfessorCard from "@/components/card/ProfessorCard.jsx";

const HomePage = () => {
    return <Page className={''}>
        <Page.Header/>
        <Page.Content>

            {/*professors*/}
            <SectionTitle path={'professors'} title={'اساتید دانشکده'}/>

          <div className={'flex flex-col gap-2'}>
              <ProfessorCard data={{
                  name: 'فرشاد صفائی سمنانی',
                  orientation: 'معماری کامپیوتر و شبکه',
                  image: images.avatar_1,
                  academic_rank: 'دانشیار'
              }}/>

              <ProfessorCard data={{
                  name: 'فرشاد صفائی سمنانی',
                  orientation: 'معماری کامپیوتر و شبکه',
                  image: images.avatar_1,
                  academic_rank: 'دانشیار'
              }}/>

              <ProfessorCard data={{
                  name: 'فرشاد صفائی سمنانی',
                  orientation: 'معماری کامپیوتر و شبکه',
                  image: images.avatar_1,
                  academic_rank: 'دانشیار'
              }}/>

          </div>
            {/*section two*/}
            <SectionTitle className={'pt-4'} path={'professors'} title={'امروز حضور دارند ...'}/>

            <div className={'w-screen flex gap-2 overflow-x-auto px-6  -mx-6'}>
                <ProfessorCard
                    type={'secondary'}
                    data={{
                        name: 'فرشاد صفائی سمنانی',
                        orientation: 'معماری کامپیوتر و شبکه',
                        image: images.avatar_1,
                        academic_rank: 'دانشیار'
                    }}/>

                <ProfessorCard
                    type={'secondary'}
                    data={{
                        name: 'فرشاد صفائی سمنانی',
                        orientation: 'معماری کامپیوتر و شبکه',
                        image: images.avatar_1,
                        academic_rank: 'دانشیار'
                    }}/>
                <ProfessorCard
                    type={'secondary'}
                    data={{
                        name: 'فرشاد صفائی سمنانی',
                        orientation: 'معماری کامپیوتر و شبکه',
                        image: images.avatar_1,
                        academic_rank: 'دانشیار'
                    }}/>
                <ProfessorCard
                    type={'secondary'}
                    data={{
                        name: 'فرشاد صفائی سمنانی',
                        orientation: 'معماری کامپیوتر و شبکه',
                        image: images.avatar_1,
                        academic_rank: 'دانشیار'
                    }}/>
            </div>
        </Page.Content>
    </Page>;
};

export default HomePage;
