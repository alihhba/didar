/* eslint-disable react-hooks/exhaustive-deps */
import moment from "jalali-moment";
import {useEffect, useState} from "react";

function useCalendar({type = "fa"}) {
    const [date, setDate] = useState(new Date());
    const [monthState, setMonthState] = useState(0);
    const [selectedYear, setSelectedYear] = useState("");
    const [yearsToSelect, setYearsToSelect] = useState([]);
    const [months, setMonths] = useState([]);
    const [selectedDay, setSelectedDay] = useState("");
    const baseDate = moment(date).locale(type);
    const jalaliDate = moment().locale(type).format("YYYY/MM/DD");
    const jalalitoday = moment().locale(type).format("dddd");

    const today = {
        dayDate: jalaliDate.replace(/\//g, "-"),
        dayName: jalalitoday,
    };

    useEffect(() => {
        setSelectedDay(today);
    }, []);

    const generateMonths = () => {
        const monthsArray = [];

        const tempDate = baseDate.clone();

        for (let i = 0; i < 3; i++) {
            const month = {
                monthName: tempDate.format("MMMM"),
                days: [],
                currentYear: tempDate.format("YYYY"),
            };

            const endOfMonth = tempDate
                .subtract(1, "month")
                .endOf("month")
                .format("YYYY/MM/D")
                .split("/")[2];

            tempDate.add(2, "month");
            baseDate.startOf("month");

            const startDay = type === "fa" ? 0 : 2;
            for (let j = startDay; j <= +baseDate.day(); j++) {
                if (+baseDate.day() !== 6) {
                    month.days.push({
                        dayName: "",
                        dayDate: `d-d-${+endOfMonth + (j - +baseDate.day())}`,
                    });
                }
            }

            if (+baseDate.day() === 0 && type !== "fa") {
                [0, 1, 2, 3, 4, 5].reverse().forEach((item) =>
                    month.days.push({
                        dayName: "",
                        dayDate: `d-d-${+endOfMonth - item}`,
                    })
                );
            }

            const currentMonth = baseDate.format("MM");

            for (let j = 0; j < baseDate.daysInMonth(); j++) {
                if (baseDate.format("MM") === currentMonth) {
                    month.days.push({
                        dayName: baseDate.format("ddd"),
                        dayDate: baseDate.format("YYYY-MM-DD"),
                    });
                    baseDate.add(1, "day");
                }
            }

            const numNextMonth =
                Math.ceil(month.days.length / 7) * 7 - month.days.length;
            for (let j = 0; j < numNextMonth; j++) {
                month.days.push({
                    dayName: "",
                    dayDate: `d-d-${j + 1}`,
                });
            }

            monthsArray.push(month);
        }

        setMonths(monthsArray);
    };

    const handleNextMonth = () => {
        setDate((prevDate) => {
            const nextMonth = prevDate.getMonth() + 1;
            if (nextMonth > 11) {
                return new Date(prevDate.getFullYear() + 1, 0, 1);
            }
            return new Date(prevDate.getFullYear(), nextMonth, 1);
        });
    };

    const handlePreviousMonth = () => {
        setDate((prevDate) => {
            const previousMonth = prevDate.getMonth() - 1;
            if (previousMonth < 0) {
                return new Date(prevDate.getFullYear() - 1, 11, 1);
            }
            return new Date(prevDate.getFullYear(), previousMonth, 1);
        });
    };

    const handleGoToToday = () => {
        setDate(new Date());
    };

    const selectYear = (year) => {
        const miladiYear = parseInt(
            moment(`${year}/01/01`, "YYYY/MM/DD").locale("en").format("YYYY"),
            10
        );
        setDate(new Date(miladiYear, date.getMonth(), 1));
        setSelectedYear("");
    };

    useEffect(() => {
        generateMonths();
    }, [date, selectedYear]);

    const currentMonth = months[monthState];
    const nextMonths = months[monthState + 1];

    return {
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
    };
}

export default useCalendar;
