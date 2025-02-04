import React, {useEffect, useMemo, useRef, useState} from 'react';
import useCalender from "@/hooks/useCalender.jsx";
import {cn} from "@/lib/utils/index.jsx";
import moment from "jalali-moment";

const WeekGunChartCalender = ({calenderType = 'en' , tasksData}) => {
    const [selectedDay, setSelectedDay] = useState(null);
    const scrollContainerRef = useRef(null);
    const [dayIndex , setDayIndex] = useState(null)

    const {isDesktop} = false;
    const {
        getCurrentWeekDays,
        today,
        handleNextWeek
    } = useCalender({type: calenderType});
    const week = useMemo(() => getCurrentWeekDays(), [getCurrentWeekDays]);
    const headerDays = week;

    useEffect(() => {
        setSelectedDay(moment(today?.dayDate , 'jYYYY-jMM-jDD').format('YYYY-MM-DD'))
    }, []);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({top: 0, behavior: 'smooth'});
        }
    }, [selectedDay, week]);

    // Fake task data
    const tasks = tasksData || [
        {title: "test 1", start: "2025-02-02T09:00", end: "2025-02-02T11:00" },
        {title: "test 1", start: "2025-02-03T11:00", end: "2025-02-03T12:00" , day_of_week:3},
    ];

    const getTaskStyles = (task) => {
        const startHour = new Date(task?.start).getHours();
        const endHour = new Date(task?.end).getHours()
        const endMinuets = new Date(task?.end).getMinutes();
        const startMinuets = new Date(task?.start).getMinutes();
        const minuetsDuration = startMinuets + endMinuets;
        const hours = endHour - startHour;
        const duration = (minuetsDuration + hours * 60) / 60;
        const spanNumb = isDesktop ? 10 : 5;

        return {
            top: `${(startHour * spanNumb) - 35}rem`,
            height: `${(duration * spanNumb) -0.5}rem`,
        };
    };

    return (
        <div
            ref={scrollContainerRef}
            className={cn('w-full relative bg-white p-4 pt-2  md:border flex flex-col rounded-md h-full grow min-h-full  ')}>
            {/*header*/}
            <div className={'sticky bg-white -mx-4 px-4 top-[56px] py-2 z-10 '}>
                {/*<div onClick={()=>{*/}
                {/*    handleNextWeek()*/}
                {/*}}>*/}
                {/*    next*/}
                {/*</div>*/}
                {/*days header*/}
                <WeekGunChartCalender.DaysHeader headerDays={headerDays} setSelectedDay={setSelectedDay} setDayIndex={setDayIndex} isDesktop={isDesktop}
                                     selectedDay={selectedDay}/>
            </div>


            {/*space */}
            <div className={'h-10 hidden md:block min-h-10 border-s ms-[55.5px] '}></div>


            {/*Main*/}
            <div className={'flex items-start justify-start w-full relative max-md:pt-10'}>
                {/* hours column */}
                <div
                    className={'w-14 min-w-14 -mt-2.5 pb-2.5  h-full grid md:grid-rows-[repeat(13,10rem)] grid-rows-[repeat(13,5rem)] md:border-e '}>
                    <div className={'w-full'}>
                        {[7,8, 9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((i, index) => (
                            <div key={index}
                                 className={'text-sm  ps-2   text-gray-600  h-full flex items-start pt-1'}>
                                {`${i}`}:00
                            </div>
                        ))}
                    </div>
                </div>

                {/*y lines*/}
                <div className={'md:grid grid-cols-1 hidden  md:grid-cols-7 w-full ps-14 absolute h-full grow  '}>
                    {Array.from({length: 7}).map((_, index) => (
                        <div className={'border-e h-full last:border-e-0'}></div>
                    ))}
                </div>


                {/*/!*x lines*!/*/}
                {/*<div*/}
                {/*    className={'grid md:grid-rows-[repeat(13,10rem)] grid-rows-[repeat(13,5rem)]  w-full ps-14 absolute h-full grow  pt-0  '}>*/}
                {/*    {Array.from({length: 13}).map((_, index) => (*/}
                {/*        <div className={'border-t h-full md:last:border-e-0 max-md:last:border-b'}></div>*/}
                {/*    ))}*/}
                {/*</div>*/}


                {/*main*/}
                <div className={'flex flex-col w-full bg-black'}>
                    {/*tasks*/}
                    <div className={'grid grid-cols-1 md:grid-cols-7 h-full grow w-full relative'}>
                        {week.map((item, colIndex) => (
                            <div key={colIndex} className={'border-x  relative h-full  w-full'}>
                                {tasks.map((task, taskIndex) => {
                                    const taskDate = new Date(task?.start).toDateString();
                                    const columnDate = new Date(moment(item?.dayDate , 'jYYYY-jMM-jDD').format('YYYY-MM-DD')).toDateString();

                                    // moment.locale("fa");
                                    // const miladiDate = task.start;
                                    // const persianDayName = moment(miladiDate, "YYYY-MM-DDTHH:mm").format("dddd");
                                    // const persianColumnName = moment(columnDate, "YYYY-MM-DDTHH:mm").format("dddd");


                                    moment.locale("en");

                                    if ((isDesktop ? taskDate === columnDate : task?.start?.slice(0, 10) === selectedDay?.split('/')[0]) || dayIndex === task?.day_of_week)   {
                                        return (
                                            <WeekGunChartCalender.TaskCard getTaskStyles={getTaskStyles} task={task}
                                                               taskIndex={taskIndex}/>
                                        )
                                    }

                                    return null;
                                })}
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>

    );
};

export default WeekGunChartCalender;

WeekGunChartCalender.TaskCard = ({taskIndex, task, getTaskStyles}) => {
    return (
        <div
            key={taskIndex}
            className={'absolute start-0  grow end-0 w-full h-full mt-[2px] '}
            style={getTaskStyles(task)}
        >

            {/* custom card */}
            <div className={'bg-[#E6F9EA] flex gap-2 bg-opacity- rounded-md h-full  w-full p-2'}>
                <div className={'border-s-2 rounded-full border-[#00BF23] h-full'}>

                </div>
                <div className={'flex flex-col gap-1'}>
                    <div className={'flex items-center gap-1 text-sm text-[#00BF23]'}>
                        <span>{task?.start.slice(11, 16)}</span>
                        <span>-</span>
                        <span>{task?.end.slice(11, 16)}</span>

                    </div>
                    <p className={'text-md text-gray-900 font-medium'}>

                    {task.title}
                    </p>
                </div>
            </div>
        </div>
    )
}

WeekGunChartCalender.DaysHeader = ({headerDays, isDesktop, selectedDay, setSelectedDay  , setDayIndex}) => {
    const dayRefs = useRef([]);

    useEffect(() => {
        if (selectedDay) {
            const index = headerDays.findIndex(item => item.dayDate === selectedDay)
            if (index !== -1 && dayRefs.current[index]) {
                dayRefs.current[index].scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center',
                    block: 'nearest',
                })
            }
        }
    }, [selectedDay, headerDays])


    return (
        <div
            className={cn(
                'grid grid-cols-5 w-full  items-center justify-center scrollbar-none gap-x-2.5 md:gap-x-0 sticky top-0 z-10  md:ps-14 text-center '
            )}
        >
            {headerDays?.slice(0,5)?.map((item, index) => {
                return (
                    <div
                        key={index}
                        ref={el => (dayRefs.current[index] = el)}
                        onClick={() => {
                            if (!isDesktop) setSelectedDay(`${moment(item?.dayDate , 'jYYYY-jMM-jDD').format('YYYY-MM-DD')}/${item?.dayName}`)
                            setDayIndex(index+1)
                        }}
                        className={cn(
                            'border text-sm bg-white font-medium border-gray-300 text-gray-800 h-10 flex rounded justify-center items-center self-center min-h-10 ',
                            (selectedDay?.split('/')[0]?.toString() === moment(item?.dayDate , 'jYYYY-jMM-jDD').format('YYYY-MM-DD')?.toString() ||
                                selectedDay ===moment(item?.dayDate , 'jYYYY-jMM-jDD').format('YYYY-MM-DD')) ? 'max-md:bg-main-900 max-md:text-white' : ''
                        )}
                    >
                        <p>{item.dayName}</p>
                    </div>
                )
            })}
        </div>
    )
}

