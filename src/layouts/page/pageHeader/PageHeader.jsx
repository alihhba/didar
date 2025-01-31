import React from 'react';
import { cn } from '@/lib/utils/index.jsx';
import Icon from "@/components/icons/Icon.jsx";
import icons from "@/lib/utils/icons.js";
import images from "@/lib/utils/images.js";



const PageHeader = ({ children, className, ...props }) => {


  // default
  if (!children) {
    return (
      <div className={cn('flex px-6 sticky top-0 z-50 pt-3 bg-white pb-3 drop-shadow-1 dark:bg-dark-dark1', className)} {...props}>
        <Icon icon={images.logo_name} className={'w-full h-full text-gray-900'}/>
      </div>
    );
  }

  // custom
  return (
    <div className={cn('sticky top-0 w-full px-6 pt-3 z-50 bg-white drop-shadow-1 pb-3 ', className)} {...props}>
      {children}
    </div>
  );
};

export default PageHeader;