import * as Headless from '@headlessui/react';
import React, { useState } from 'react';
import { cn } from '@/lib/utils/index.jsx';
import { useModal } from '@/context/modalContext.jsx';

const CenterPageModal = ({
                             children,
                             className,
                             modalName,
                             modalSize = 'max-w-lg',
                             childClass,
                         }) => {
    const { changeModalHandler, isModalOpen, modalType } = useModal();

    const isModal = isModalOpen && modalType === modalName?.toString().toLowerCase().replaceAll('_' , '-');

    // For gesture
    const [startY, setStartY] = useState(0);
    const [currentY, setCurrentY] = useState(0);

    const handleTouchStart = (e) => {
        setStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
        setCurrentY(e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
        const swipeDistance = currentY - startY;
        const threshold = 50;

        if (swipeDistance > threshold) {
            changeModalHandler({ isModal: false });
        }
        setStartY(0);
        setCurrentY(0);
    };

    return (
        <Headless.Transition show={isModal}>
            <div
                onClick={() => {
                    changeModalHandler({ isModal: false });
                }}
                className={cn(
                    `fixed inset-0 z-[104] flex items-center justify-center bg-black-500 bg-opacity-50 ${className}`,
                )}
            >
                <Headless.Transition.Child
                    enter="transform transition ease-in-out duration-200"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transform transition ease-in-out duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={cn(
                            `${modalSize} w-full h-auto bg-transparent rounded-lg`,
                        )}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div
                            className={cn(
                                'overflow-y-auto h-full w-full p-6 relative',
                                childClass,
                            )}
                        >
                            <div>{children}</div>
                        </div>
                    </div>
                </Headless.Transition.Child>
            </div>
        </Headless.Transition>
    );
};

export default CenterPageModal;
