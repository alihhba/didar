import React, {useEffect} from 'react';
import clsx from 'clsx';
import FullPageModal from '../components/modals/layouts/FullPageModal.jsx';
import {useModal} from '@/context/modalContext.jsx';
import ProfessorFilterModal from "@/components/modals/ProfessorFilterModal.jsx";
import LogoutModal from "@/components/modals/LogoutModal.jsx";


export const ModalProviders = () => {
    const {isModalOpen, changeModalHandler} = useModal();


    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => document.body.classList.remove('overflow-hidden');
    }, [isModalOpen]);

    return (
        <main className={`${isModalOpen && 'md:fixed md:inset-0 z-[90] w-full'}`}>
            <FullPageModal
                modalName={'professors-filters'}
                fullScreen={false}
                childClass={'relative p-0 px-6 dark:bg-dark-dark1'}
            >
                <ProfessorFilterModal/>
            </FullPageModal>

            <FullPageModal
                modalName={'logout'}
                fullScreen={false}
                childClass={'relative p-0 px-6 dark:bg-dark-dark1'}
            >
                <LogoutModal/>
            </FullPageModal>


            {/* background */}
            <div
                style={{
                    backdropFilter: 'blur(1px)',
                    opacity: isModalOpen ? 1 : 0,
                    transition: 'opacity 150ms ease-in-out',
                    pointerEvents: isModalOpen ? 'auto' : 'none',
                }}
                onClick={() => {
                    changeModalHandler({isModal: false});
                }}
                className={clsx(
                    'bg-black/25 transition-opacity duration-200 fixed top-0 right-0 w-full h-screen z-[100]',
                )}
            />
        </main>
    );
};

export default ModalProviders;
