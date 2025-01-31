import React, { useEffect } from 'react';
import { cn } from '@/lib/utils/index.jsx';
import PageHeader from '@/layouts/page/pageHeader/PageHeader.jsx';
import PageContent from '@/layouts/page/PageContent.jsx';
import { useLocation } from 'react-router-dom';

const Page = ({ children, className }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={cn('flex flex-col h-full grow ')}>
      <div className={cn('flex flex-col h-full grow ', className)}>
        {children}
      </div>
    </div>
  );
};


Page.Header = PageHeader;
Page.Content = PageContent;


export default Page;