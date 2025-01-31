import React from 'react';
import {useFormContext} from 'react-hook-form';
import {useFormFieldContext} from './FormField';
import {cn} from '@/lib/utils/index.jsx';

export function FormTextarea({ className, ...props }) {
    const { name, error } = useFormFieldContext();
    const { register } = useFormContext();
    const inputProps = register(name);

    return (
        <textarea
            id={name}
            {...inputProps}
            {...props}
            className={cn(
                "focus:border-primary-500/10 w-full outline-none focus:border focus:bg-primary-500/10 bg-greyScale-50 drop-shadow-sm rounded-2xl px-5 py-[20px] placeholder:text-greyScale-500 placeholder:text-md  font-medium placeholder:font-normal dark:bg-dark-dark2 dark:text-white-500",
                error?.message ? 'border-red-600' : 'border-primary-500',
                className
            )}
        />
    );
}
