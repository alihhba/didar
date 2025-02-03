import React, {memo, useMemo} from "react";
import PropTypes from "prop-types";
import {differenceInSeconds, format as formatGregorian, formatDistanceToNowStrict, isFuture,} from "date-fns";
import {format as formatJalali} from "date-fns-jalali";
import {cn} from "@/lib/utils/index.jsx";

const DateFormatter = memo(({dateInput, secondDateInput, formatType  ,  locale = "en", className}) => {
    const date = useMemo(() => {
        const parsedDate = new Date(dateInput);
        return isNaN(parsedDate) ? null : parsedDate;
    }, [dateInput]);


    const secondDate = useMemo(() => {
        if (!secondDateInput) return null;
        const parsedDate = new Date(secondDateInput);
        return isNaN(parsedDate) ? null : parsedDate;
    }, [secondDateInput]);

    const formatterLocale = 'fa'

    const formattedDate = useMemo(() => {
        if (!date) {
            return formatterLocale === "fa" ? "--" : "--";
        }

        const formats = {
            shortDayMonth: () =>
                formatterLocale === "fa"
                    ? formatJalali(date, "eee d") // شنبه 5
                    : formatGregorian(date, "eee d"), // Sun 5
            dayOnly: () =>
                formatterLocale === "fa"
                    ? formatJalali(date, "d") // 24
                    : formatGregorian(date, "d"), // 24
            timeOnly: () =>
                formatterLocale === "fa"
                    ? formatJalali(date, "hh:mm") // 4:00
                    : formatGregorian(date, "hh:mma"), // 4:00 PM
            monthDay: () =>
                formatterLocale === "fa"
                    ? formatJalali(date, "MMM d") // مهر 10
                    : formatGregorian(date, "MMM d"), // Oct 10
            dayMonth: () =>
                formatterLocale === "fa"
                    ? formatJalali(date, "d MMM") // مهر 10
                    : formatGregorian(date, "d MMM"), // 10 Oct
            relative: () => {
                const relativeTime = formatDistanceToNowStrict(date);
                if (formatterLocale === "fa") {
                    return isFuture(date)
                        ? `در ${relativeTime
                            .replace(/years|year/g, "سال")
                            .replace(/months|month/g, "ماه")
                            .replace(/days|day/g, "روز")
                            .replace(/hours|hour/g, "ساعت")
                            .replace(/minutes|minute/g, "دقیقه")
                            .replace(/seconds|second/g, "ثانیه")}`
                        : relativeTime.includes("second")
                            ? "همین الان"
                            : `${relativeTime
                                .replace(/years|year/g, "سال")
                                .replace(/months|month/g, "ماه")
                                .replace(/days|day/g, "روز")
                                .replace(/hours|hour/g, "ساعت")
                                .replace(/minutes|minute/g, "دقیقه")
                                .replace(/seconds|second/g, "ثانیه")} قبل`;
                } else {
                    return isFuture(date)
                        ? `in ${relativeTime}`
                        : relativeTime.includes("second")
                            ? "just now"
                            : `${relativeTime
                                .replace(/hours|hour/g, "h")
                                .replace(/minutes|minute/g, "m")
                                .replace(/days|day/g, "d")} ago`;
                }
            },
            yearOnly: () =>
                formatterLocale === "fa"
                    ? formatJalali(date, "yyyy") // 1402
                    : formatGregorian(date, "yyyy"), // 2024
            monthOnly: () =>
                formatterLocale === "fa"
                    ? formatJalali(date, "MMMM") // مهر
                    : formatGregorian(date, "MMM"), // Oct
            dayOnlyLong: () =>
                formatterLocale === "fa"
                    ? formatJalali(date, "eeee") // جمعه
                    : formatGregorian(date, "eeee"), // Friday
            fullDateSlash: () =>
                formatterLocale === "fa"
                    ? formatJalali(date, "dd/MM/yyyy") // 02/07/1402
                    : formatGregorian(date, "dd/MM/yyyy"), // 02/10/2024
            timeFullDateSlash: () =>
                formatterLocale === "fa"
                    ? formatJalali(date, " dd/MM/yyyy | hh:mm ") // 02/07/1402
                    : formatGregorian(date, "hh:mm | dd/MM/yyyy"), // 11:10 || 02/10/2024
            fullDateLong: () =>
                formatterLocale === "fa"
                    ? formatJalali(date, "d MMMM yyyy") // 10 مهر 1402
                    : formatGregorian(date, "d MMM yyyy"), // 10 Oct 2024
            fullMonthDateLong: () =>
                formatterLocale === "fa"
                    ? formatJalali(date, "d MMMM yyyy") // 10 مهر 1402
                    : formatGregorian(date, "d MMMM yyyy"), // 10 October 2024
            time24Hour: () =>
                formatGregorian(date, "HH:mm"), // 08:01
            dateMonthYear: () =>
                formatterLocale === "fa"
                    ? formatJalali(date, "MMMM d, yyyy") // مهر 10, 1402
                    : formatGregorian(date, "MMM d, yyyy"), // Oct 7, 2020
            dateTimeLong: () =>
                formatterLocale === "fa"
                    ? formatJalali(date, "MMMM d, yyyy 'ساعت' h:mm") // مهر 10, 1402 ساعت 2:00 PM
                    : formatGregorian(date, "MMM d, yyyy 'at' h:mm a"), // Oct 7, 2020 at 2:00 PM
            dayDateTimeLong: () =>
                formatterLocale === "fa"
                    ? formatJalali(date, "eeee, dd MMMM yyyy") //Friday, 26 February 2021
                    : formatGregorian(date, "eeee, dd MMMM yyyy"),
            fullDateShort: () =>
                formatterLocale === "fa"
                    ? formatJalali(date, "MMMM d, yyyy") // مهر 10, 1402
                    : formatGregorian(date, "MMM d, yyyy"), // Oct 10, 2024
            timeDifference: () => {
                if (!secondDate) return "--";
                const secondsDiff = Math.abs(differenceInSeconds(date, secondDate));

                const days = Math.floor(secondsDiff / (3600 * 24));
                const hours = Math.floor((secondsDiff % (3600 * 24)) / 3600);
                const minutes = Math.floor((secondsDiff % 3600) / 60);
                const seconds = secondsDiff % 60;

                const timeString = `${days > 0 ? `${days}d ` : ""}${String(hours).padStart(2, "0")}:${String(
                    minutes
                ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

                return timeString;
            },   // 19:02:25
            timeDifference2: () => {
                if (!secondDate) return "--";
                const secondsDiff = Math.abs(differenceInSeconds(date, secondDate));

                const days = Math.floor(secondsDiff / (3600 * 24));
                const hours = Math.floor((secondsDiff % (3600 * 24)) / 3600);
                const minutes = Math.floor((secondsDiff % 3600) / 60);
                const seconds = secondsDiff % 60;

                const timeString = `${days > 0 ? `${days}d ` : ""}${String(hours).padStart(2, "0")}h ${String(
                    minutes
                ).padStart(2, "0")}m`;

                return timeString;
            },   // 19h 02m
        };

        return formats[formatType]?.() || (formatterLocale === "fa" ? "--" : "--");
    }, [date, formatType, locale]);

    return <div className={cn('w-fit h-fit flex items-center text-sm font-medium  gap-0.5', className)}>
        <div>
            {formattedDate}
        </div>
    </div>;
});

DateFormatter.propTypes = {
    dateInput: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)])
        .isRequired,
    secondDateInput: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date),
    ]),
    formatType: PropTypes.string.isRequired,
    locale: PropTypes.oneOf(["en", "fa"]),
};

export default DateFormatter;
