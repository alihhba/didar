import moment from "jalali-moment";
import { useEffect, useState, useMemo } from "react";

function useCalendar({ type = "fa" }) {
    const [date, setDate] = useState(new Date());
    const [monthState, setMonthState] = useState(0);
    const [selectedYear, setSelectedYear] = useState("");
    const [yearsToSelect, setYearsToSelect] = useState([]);
    const [months, setMonths] = useState([]);
    const [selectedDay, setSelectedDay] = useState("");

    // Initialize the base date with locale
    const baseDate = useMemo(() => moment(date).locale(type), [date, type]);

    const today = useMemo(() => {
        const jalaliDate = moment().locale(type).format("YYYY/MM/DD");
        const jalaliToday = moment().locale(type).format("dddd");
        return {
            dayDate: jalaliDate.replace(/\//g, "-"),
            dayName: jalaliToday,
        };
    }, [type]);

    useEffect(() => {
        setSelectedDay(today);
    }, [today]);

    // Generate calendar months (current, previous, and next)
    const generateMonths = () => {
        const monthsArray = [];
        let tempDate = baseDate.clone();

        for (let i = 0; i < 3; i++) {
            const month = {
                monthName: tempDate.format("MMMM"),
                days: [],
                currentYear: tempDate.format("YYYY"),
            };

            const previousMonthDate = tempDate.clone().subtract(1, "month");
            const endOfPreviousMonth = previousMonthDate.endOf("month").date();

            const startOfMonthDate = tempDate.clone().startOf("month");
            const startDayOfWeek = startOfMonthDate.day();

            // Add days from the previous month
            for (let j = 0; j < startDayOfWeek; j++) {
                const dayDate = previousMonthDate
                    .clone()
                    .subtract(startDayOfWeek - j - 1, "day")
                    .format("YYYY-MM-DD");
                month.days.push({ dayName: "", dayDate });
            }

            // Add days in the current month
            const daysInCurrentMonth = startOfMonthDate.daysInMonth();
            for (let j = 0; j < daysInCurrentMonth; j++) {
                const dayDate = startOfMonthDate.clone().add(j, "days");
                month.days.push({
                    dayName: dayDate.format("ddd"),
                    dayDate: dayDate.format("YYYY-MM-DD"),
                });
            }

            // Add days for the next month to fill the week
            const remainingDays = 7 - (month.days.length % 7);
            for (let j = 0; j < remainingDays && remainingDays < 7; j++) {
                const dayDate = startOfMonthDate
                    .clone()
                    .add(daysInCurrentMonth + j, "days")
                    .format("YYYY-MM-DD");
                month.days.push({ dayName: "", dayDate });
            }

            monthsArray.push(month);
            tempDate.add(1, "month");
        }

        setMonths(monthsArray);
    };

    const handleNextMonth = () => {
        setDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    };

    const handlePreviousMonth = () => {
        setDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
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

    // Get current week days
    const getCurrentWeekDays = () => {
        const startOfWeek = baseDate.clone().startOf("week");
        const weekDays = [];

        for (let i = 0; i < 7; i++) {
            const day = startOfWeek.clone().add(i, "days");
            weekDays.push({
                dayName: day.format("dddd"),
                dayDate: day.format("YYYY-MM-DD"),
                monthName: day.format("MMMM"),
            });
        }

        return weekDays;
    };

    // Handle next week
    const handleNextWeek = () => {
        setDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth(), prevDate.getDate() + 7));
    };

    // Handle previous week
    const handlePreviousWeek = () => {
        setDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth(), prevDate.getDate() - 7));
    };

    useEffect(() => {
        generateMonths();
    }, [date, selectedYear, baseDate]);

    const currentMonth = months[monthState];
    const nextMonths = months[monthState + 1];

    return {
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
        currentMonth,
        nextMonths,
        getCurrentWeekDays,
        handleNextWeek,
        handlePreviousWeek,
    };
}

export default useCalendar;
