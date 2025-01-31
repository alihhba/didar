import { offset, useFloating } from "@floating-ui/react";
import * as Headless from "@headlessui/react";
import { useState, useRef, useEffect } from "react";

const DropDown = ({
  withHover = false,
  children,
  childrenHover = false,
  placement,
  icon,
  offsetNum = 3,
  onHoverLeaveClose = true,
  closeOnClickChildren = true,
}) => {
  const [moreInfo, setMoreInfo] = useState(false);
  const iconMouseEnterTimeout = useRef(null);
  const mouseEnterTimeout = useRef(null);

  const { refs, floatingStyles } = useFloating({
    placement,
    open: moreInfo,
    onOpenChange: setMoreInfo,
    middleware: [offset(+offsetNum)],
  });

  useEffect(() => {
    // Cleanup timeouts when component unmounts
    return () => {
      clearTimeout(iconMouseEnterTimeout.current);
      clearTimeout(mouseEnterTimeout.current);
    };
  }, []);

  const handleIconMouseEnter = () => {
    if (withHover) {
      setMoreInfo(true);
    }
    clearTimeout(iconMouseEnterTimeout.current);
  };

  const handleIconMouseLeave = () => {
    if (withHover && !childrenHover) {
      iconMouseEnterTimeout.current = setTimeout(() => {
        setMoreInfo(false);
      }, 500);
    }
  };

  const handleContentMouseEnter = () => {
    clearTimeout(iconMouseEnterTimeout.current);
    clearTimeout(mouseEnterTimeout.current);
  };

  const handleContentMouseLeave = () => {
    if (!childrenHover) {
      mouseEnterTimeout.current = setTimeout(() => {
        if (onHoverLeaveClose) {
          setMoreInfo(false);
        }
      }, 1000);
    }
  };

  const handleOverlayClick = () => {
    setMoreInfo(false);
  };

  return (
    <div className="flex w-fit h-fit">
      <div
        ref={refs.setReference}
        onClick={() => {
          if (!withHover) {
            setMoreInfo((prev) => !prev);
          }
        }}
        onMouseEnter={handleIconMouseEnter}
        onMouseLeave={handleIconMouseLeave}
        className="cursor-pointer items-center min-w-full flex w-fit h-fit"
      >
        {icon}
      </div>

      <Headless.Transition
        show={moreInfo}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          onMouseEnter={handleContentMouseEnter}
          onMouseLeave={handleContentMouseLeave}
          onClick={() => {
            if (closeOnClickChildren) {
              setMoreInfo(false);
            }
          }}
          className="absolute flex flex-col gap-4 z-[100] h-fit w-fit min-w-fit rounded-lg border bg-white dark:bg-primary_dark-300 dark:border-secondary_grey-100 drop-shadow-lg"
        >
          {children}
        </div>
      </Headless.Transition>

      {moreInfo && !childrenHover && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-40 h-full w-full cursor-default"
        />
      )}
    </div>
  );
};

export default DropDown;
