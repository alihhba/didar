import * as Headless from '@headlessui/react';
import React, {useState} from 'react';
import {cn} from '@/lib/utils/index.jsx';
import {useModal} from '@/context/modalContext.jsx';


const FullPageModal = ({
                         children,
                         className,
                         modalName,
                         fullScreen = true,
                         childClass,
                       }) => {
  const { changeModalHandler, isModalOpen, modalType } = useModal();
  const isModal = isModalOpen && modalType === modalName?.toString().toLowerCase().replaceAll('_' , '-');

  // For  gesture
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

    if (swipeDistance > threshold && !fullScreen) {
      changeModalHandler({ isModal: false });
    }
    setStartY(0);
    setCurrentY(0);
  };

  return (
    <Headless.Transition  show={isModal}>
      <div
        onClick={() => {
          changeModalHandler({ isModal: false });
        }}
        className={cn(
          `fixed inset-0 z-[104] flex items-center justify-center  ${className}`,
        )}
      >
        <Headless.Transition.Child
          enter="transform transition ease-in-out duration-100"
          enterFrom="opacity-0 translate-y-full"
          enterTo="opacity-100 translate-y-0"
          leave="transform transition ease-in-out duration-100"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-full"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={cn(
              `${
                fullScreen
                  ? 'w-full h-[100dvh]'
                  : 'w-full h-auto max-h-fit '
              } rounded-t-lg md:rounded-lg shadow-lg fixed bottom-0`,
            )}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={cn(
                'overflow-y-auto h-full w-full pb-10 bg-white dark:bg-dark-dark1 relative',
                fullScreen ? '' : 'rounded-t-4xl',
                childClass,
              )}
            >
              <div>
                {children}
              </div>
              {/* Top menu button for non-fullPage modal */}

              <div className="absolute mx-auto right-0 left-0 rounded-full top-2 w-full min-w-9 max-w-9 h-[3px] bg-greyScale-300"></div>
            </div>
          </div>
        </Headless.Transition.Child>
      </div>
    </Headless.Transition>
  );
};

export default FullPageModal;
