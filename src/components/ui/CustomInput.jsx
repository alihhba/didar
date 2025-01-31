import React, {useState} from 'react';
import {cn} from '../../lib/utils';
import Icons from '../../lib/utils/Icons';
import Icon from "@/components/icons/Icon.jsx";
import {Input} from "@/components/ui/Input.jsx";


const CustomInput = React.forwardRef(
    (
        {
            icon,
            label,
            hint,
            onChange = () => {
            },
            type = 'number',
            error,
            hasClose = false,
            className,
            iconClassName,
            iconParentClassName,
            endIconClassName,
            endIcon,
            ...props
        },
        ref,
    ) => {
        const [value, setValue] = useState('');
        const [isFocused, setIsFocused] = useState(false);
        const [isPasswordVisible, setIsPasswordVisible] = useState(false);

        let iconColor;
        if (isFocused) {
            iconColor = 'text-primary-500';
        } else if (value) {
            iconColor = 'text-[#212121] dark:text-[#fff]';
        } else {
            iconColor = 'text-[#9E9E9E]';
        }

        const handleTogglePasswordVisibility = () => {
            setIsPasswordVisible((prev) => !prev);
        };

        const closeHandler = (e) => {
            e.preventDefault();
            setValue('');
            onChange({target: {value: ''}});
        };

        return (
            <div className="flex flex-col gap-[3px] w-full relative">
                <label
                    htmlFor={label}
                    className="text-greyScale-500 text-md font-medium ps-[2px]"
                >
                    {label}
                </label>
                <div className="relative">
                    {icon && (
                        <div className={cn("absolute bottom-0 top-0 flex item-center justify-center w-fit z-10 start-5", iconParentClassName)}>
                            <Icon
                                icon={icon}
                                className={cn('w-5 h-5 self-center ', iconColor, iconClassName)}
                            />
                        </div>
                    )}
                    <Input
                        {...props}
                        ref={ref}
                        // id={label}
                        type={
                            type === 'password' && !isPasswordVisible ? 'password' : 'text'
                        }
                        onChange={(e) => {
                            setValue(e.target.value);
                            onChange(e);
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className={cn(
                            ' h-12  rounded-md border-gray-400 placeholder:text-gray-700 placeholder:text-md  font-medium placeholder:font-normal ',
                            icon ? ' ps-12' : '',
                            type === 'password' ? ' pe-12' : '',
                            className,
                        )}
                    />

                    {type === 'password' && (
                        <div
                            className="absolute justify-center top-0 bottom-0 start-5 z-10 cursor-pointer flex items-center "
                            onClick={handleTogglePasswordVisibility}
                        >
                            <Icon
                                icon={isPasswordVisible ? Icons.eye_slash : Icons.eye_slash}
                                className={cn('w-6 h-6 flex items-center justify-center', iconClassName)}
                                color={iconColor}
                            />
                        </div>
                    )}
                    {value && hasClose && (
                        <div
                            className="absolute bottom-0 top-0 flex item-center justify-center w-fit end-5 z-[100] cursor-pointer "
                            onMouseDown={(e) => {
                                e.preventDefault();
                                closeHandler(e);
                            }}
                        >
                            <Icon
                                icon={Icons.close}
                                className={cn('w-5 h-5 self-center ', iconColor, iconClassName)}
                            />
                        </div>
                    )}
                    {endIcon ?
                        <div
                            className="absolute bottom-0 top-0 flex item-center justify-center w-fit end-5 z-[100] cursor-pointer"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                closeHandler(e);
                            }}
                        >
                            <Icon
                                icon={endIcon}
                                className={cn('w-5 h-5 self-center ', iconColor, endIconClassName)}
                            />
                        </div>
                        : null}

                </div>
                {hint && (
                    <div className="mt-[6px] ps-[2px] ">
                        <p className="text-sm font-normal ">{hint}</p>
                    </div>
                )}
                {error && (
                    <div className="mt-[6px] ps-[2px] absolute -bottom-6">
                        <p className="text-sm font-normal text-red-500">{error}</p>
                    </div>
                )}
            </div>
        );
    },
);
export default CustomInput;
