import React from 'react';
import {useFormFieldContext} from './FormField';
import {cn} from "@/lib/utils/index.jsx";

export function FormLabel({ children  , className, ...props }) {
    const { name } = useFormFieldContext();
    return <label className={cn('text-md text-black dark:text-white-500' ,className)} htmlFor={name} {...props}>{children}</label>;
}
