import React from 'react';
import CustomInput from '@/components/ui/CustomInput.jsx';
import Icons from '@/lib/utils/Icons.js';
import { cn } from '@/lib/utils/index.jsx';
import { useTranslation } from 'react-i18next';
import useQuery from "@/hooks/useQuery.jsx";

const CustomSearchBox = ({ className, ref, ...props }) => {
  const { setQuery, getQuery } = useQuery();

  const onHandleSearch = (e) => {
    setQuery({ q: e.target.value }, { replace: true });
  };

  return (
    <CustomInput
      ref={ref}
      placeholder={'جستجو اساتید'}
      icon={Icons.search}
      className={cn('w-full dark:bg-dark-dark3 dark:text-white-500 right-0 rounded-full', className)}
      type="text"
      value={getQuery('q') || ''}
      onChange={(e) => {
        onHandleSearch(e);
      }}
      hasClose={true}
      {...props}
    />
  );
};

export default CustomSearchBox;