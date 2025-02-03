import React from 'react';
import images from "@/lib/utils/images.js";
import DateFormatter from "@/components/DateFormatter.jsx";

const WeekEventCard = ({data}) => {
    const {title , time} = data || {
        title: 'جلسه شورا',
        time: '2025-02-02T09:00'
    }
    return (
        <div
            className={' relative w-[148px] min-w-[148px] max-w-[148px] overflow-hidden h-[108px] min-h-[108px] p-4 rounded-xl bg-white'}>
            <div className={'absolute top-0 end-0'}>
                <img src={images.google_calender} className={'w-20 h-20 opacity-20'} alt=""/>

            </div>

            <p className={'w-full text-center text-xl font-medium text-gray-900'}>
                {title}
            </p>
            <div className={'mt-auto pt-10 flex  items-center justify-between w-full max-w-[140px] flex-row-reverse'}>
                <DateFormatter dateInput={time} formatType={'fullDateSlash'}/>
                <DateFormatter dateInput={time} formatType={'dayOnlyLong'}/>

            </div>
        </div>
    );
};

export default WeekEventCard