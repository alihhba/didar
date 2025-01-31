import React, {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {useFormFieldContext} from './FormField';
import {cn} from '@/lib/utils/index.jsx';

export function FormRadioGroup({
                                   className,
                                   children,
                                   peerClassName,
                                   radioClassName,
                                   rowClassName,
                                   optionClassName,
                                   filter,
                                   notActive = [],
                                   options = [],
                                   ...props
                               }) {
    const {name} = useFormFieldContext();
    const {register , watch} = useFormContext();
    const filteredData = options?.filter((item) => (filter ? filter(item) : true));
    const defaultSelected = filteredData.find((item)=> item?.value === watch(name)?.toString())
    const [selected, setSelected] = useState( defaultSelected?.id|| null);

    return (
        <div className={cn('flex w-full flex-col gap', className)} {...props}>
            {filteredData.map((option) => {
                const isActive = +selected === +option.id;

                return (
                    <label
                        key={option.value}
                        className={cn("flex items-center  justify-between  gap-2 cursor-pointer select-none w-full",rowClassName)}
                        onClick={() => {
                            setSelected(option?.id);
                        }}
                    >
                        <input
                            type="radio"
                            disabled={notActive?.includes(option?.value || filteredData?.slug || option?.id)}
                            value={option.value}
                            {...register(name)}
                            className="sr-only peer"
                        />

                        {!children ? (

                            <div
                                className={cn("w-5 h-5 min-h-5 min-w-5  flex  items-center justify-center bg- rounded-full transition-colors duration-200 border-[3px] border-primary-500   ")}>
                                <div
                                    className={cn("w-3 h-3 min-w-3 max-w-3 min-h-3 max-h-3  bg-primary-500 hidden   border border-white-500 dark:border-dark-dark1  rounded-full", isActive && ' flex')}></div>
                            </div>
                        ) : null}

                        <div className={cn('flex w-full items-center ', optionClassName)}>
                            <div
                                className={`text-gray-700  dark:text-white-500 w-full ${notActive?.includes(option?.value || filteredData?.slug || option?.id) ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                {children ? children({option, isSelected: selected}) : option.label}
                            </div>
                        </div>
                    </label>
                )
            })}
        </div>
    );
}
