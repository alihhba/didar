/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Shamsi } from "basic-shamsi";
import DropDown from "@/components/dropdown/DropDown.jsx";
import {cn, digitsEnToFaFunction} from "@/lib/utils/index.jsx";
import useCalendar from "@/hooks/useCalender.jsx";

const MonthCalender = ({
                           type,
                           isSelectToday = false,
                           isTodayButton = false,
                       }) => {
    const {
        currentMonth,
        nextMonths,
        today,
        months,
        monthState,
        setMonthState,
        yearsToSelect,
        setYearsToSelect,
        handleNextMonth,
        handlePreviousMonth,
        handleGoToToday,
        selectYear,
        selectedDay,
        setSelectedDay,
        setDate,
        date,
    } = useCalendar({ type });

    return (
        <div className="flex flex-col w-full min-w-full">
            <div className="flex w-full min-w-max">
                {/* calender */}
                <div className=" h-fit w-full rounded-lg md:mb-auto mt- ">
                    {/* months */}
                    <div className="flex rtl:flex-row-reverse items-center justify-between">
                        <button
                            onClick={() => {
                                if (type === "en") {
                                    handlePreviousMonth();
                                } else handleNextMonth();
                            }}
                        >
                            <ChevronLeftIcon className="w-4 h-4" />
                        </button>
                        <div className="flex w-full relative justify-center  items-center gap-4">
                            {/* year */}
                            <DropDown
                                placement={"bottom"}
                                offsetNum={3}
                                icon={
                                    <div
                                        className="flex relative cursor-pointer"
                                        onClick={() => {
                                            const baseYear = +today.dayDate.split("-")[0];

                                            const years = [];
                                            for (let i = -100; i <= 100; i++) {
                                                years.push(+baseYear + i);
                                            }
                                            setYearsToSelect(years);
                                        }}
                                    >
                                        <p>{digitsEnToFaFunction(currentMonth?.currentYear)}</p>

                                        {/* month name */}
                                        <p className="px-3">{currentMonth?.monthName}</p>
                                    </div>
                                }
                            >
                                <div className="w-full min-w-[300px] max-w-[300px] max-h-[200px] overflow-y-auto p-3  grid grid-cols-4 gap-1 items-center justify-center   mx-auto">
                                    {yearsToSelect?.map((year) => (
                                        <div
                                            onClick={() => {
                                                const miladiYear = parseInt(
                                                    Shamsi.toMiladi(`${year}/01/01`).split("/")[0],
                                                    10
                                                );
                                                if (type === "fa") {
                                                    setDate(new Date(miladiYear, date.getMonth(), 1));
                                                } else {
                                                    setDate(new Date(year, date.getMonth(), 1));
                                                }
                                                // setYearsToSelect("");
                                            }}
                                            className="cursor-pointer flex items-center justify-center py-[5px]"
                                            key={year}
                                        >
                                            {digitsEnToFaFunction(year)}
                                        </div>
                                    ))}
                                </div>
                            </DropDown>

                            {isTodayButton ? (
                                <div
                                    className="absolute right-7"
                                    onClick={() => {
                                        setDate(new Date());
                                    }}
                                >
                                    امروز
                                </div>
                            ) : null}
                        </div>

                        <button
                            onClick={() => {
                                if (type === "en") {
                                    handleNextMonth();
                                } else {
                                    handlePreviousMonth();
                                }
                            }}
                        >
                            <ChevronRightIcon className="w-4 h-4" />
                        </button>
                    </div>
                    {/* days */}
                    <div
                        className={`grid grid-cols-7 text-[0.6rem] md:text-[10px]  text-center mt-5  w-full `}
                    >
                        {type === "fa" ? <div>شنبه</div> : <div>Mon</div>}
                        {type === "fa" ? <div>یک‌شنبه</div> : <div>Tue</div>}
                        {type === "fa" ? <div>دوشنبه</div> : <div>Wed</div>}
                        {type === "fa" ? <div>سه‌شنبه</div> : <div>Thu</div>}
                        {type === "fa" ? <div>چهارشنبه</div> : <div>Fri</div>}
                        {type === "fa" ? <div>پنج‌شنبه</div> : <div>Sat</div>}
                        {type === "fa" ? <div>جمعه</div> : <div>Sun</div>}
                    </div>

                    <div className="isolate mt-2  grid grid-cols-7 gap-px rounded-lg bg-gray-200 dark:border-secondary_grey-100 text-sm shadow ring-1 ring-gray-200">
                        {currentMonth?.days.map((day, dayIdx) => {
                            const isDaySelected = day.dayDate === selectedDay;

                            return (
                                <div
                                    onClick={() => {
                                        if (day.dayName) {
                                            setSelectedDay(day.dayDate);
                                        }
                                    }}
                                    key={day.dayDate}
                                    className={cn(
                                        "py-1.5    dark:text-white  focus:z-10",
                                        day.dayName
                                            ? "bg-white dark:bg-primary_dark-100"
                                            : "bg-gray-50 dark:bg-primary_dark-100/80",
                                        (selectedDay === day.dayDate ||
                                            day.dayDate === today.dayDate) &&
                                        "font-semibold",
                                        selectedDay === day.dayDate && "text-white",
                                        selectedDay !== day.dayDate &&
                                        day.dayName &&
                                        day.dayDate !== today.dayDate &&
                                        "text-gray-900",
                                        selectedDay !== day.dayDate &&
                                        !day.dayName &&
                                        day.dayDate !== today.dayDate &&
                                        "text-gray-400",

                                        dayIdx === 0 && "rounded-ts-lg ",
                                        dayIdx === 6 && "rounded-te-lg ",
                                        Math.ceil(months[monthState]?.days.length / 7) === 5 &&
                                        dayIdx === 28 &&
                                        "rounded-bs-lg ",
                                        Math.ceil(months[monthState]?.days.length / 7) === 5 &&
                                        dayIdx === 34 &&
                                        "rounded-be-lg ",
                                        Math.ceil(months[monthState]?.days.length / 7) === 6 &&
                                        dayIdx === 35 &&
                                        "rounded-bs-lg ",
                                        Math.ceil(months[monthState]?.days.length / 7) === 6 &&
                                        dayIdx === 41 &&
                                        "rounded-be-lg ",
                                        day.dayName !== "" ? "cursor-pointer" : "cursor-default"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "mx-auto   flex h-7 w-7  items-center justify-center rounded-full font",
                                            isDaySelected && "bg-black",
                                            day.dayDate === today.dayDate &&
                                            selectedDay !== day.dayDate &&
                                            "bg-indigo-500 dark:bg- text-white "
                                        )}
                                    >
                                        {type === "fa"
                                            ? digitsEnToFaFunction(
                                                day.dayDate.split("-").pop()?.replace(/^0/, "")
                                            )
                                            : day.dayDate.split("-").pop()?.replace(/^0/, "")}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonthCalender;
