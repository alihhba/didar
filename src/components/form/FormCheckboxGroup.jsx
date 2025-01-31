import React from 'react';
import {useFormContext} from 'react-hook-form';
import {useFormFieldContext} from './FormField';
import {cn} from '@/lib/utils/index.jsx';
import {Check} from 'lucide-react';

export function FormCheckboxGroup({
                                      className,
                                      children,
                                      optionClassName,
                                      classNameLabel,
                                      filter,
                                      allowedValues,
                                      options = [],
                                      ...props
                                  }) {
    const {name} = useFormFieldContext();
    const {register, watch} = useFormContext();
    const selectedValues = watch(name) || [];

    const filteredData = options?.filter((item) => (filter ? filter(item) : true));

    return (
        <div className={cn('flex flex-col w-full gap-2', className)} {...props}>
            {filteredData.map((option) => {
                const isChecked = selectedValues.includes(option.value.toString() || option.id.toString());
                return (
                    <label
                        key={option.value}
                        className={cn(
                            "flex w-full items-center gap-2 cursor-pointer ", classNameLabel,
                            // !allowedValues?.includes(option.value) && "cursor-not-allowed opacity-50"
                        )}
                    >
                        <input
                            // disabled={!allowedValues?.includes(option.value)}
                            type="checkbox"
                            value={option.value}
                            {...register(name)}
                            className="hidden"
                        />

                        {!children ? (
                            <span className={cn(
                                "w-5 h-5 border-2 border-primary-500 dark:border-primary-500 rounded-md flex justify-center items-center transition-colors duration-200",
                                isChecked ? "bg-primary-500  border-primary-500" : ""
                            )}>
                            {isChecked && <Check className="text-white-500 w-3 h-3 "/>}
                        </span>
                        ) : null}
                        <div
                            className={cn("text-gray-700 dark:text-white-500 w-full", optionClassName)}>{children ? children({
                            option,
                            isChecked
                        }) : option.label}</div>
                    </label>
                );
            })}
        </div>
    );
}
