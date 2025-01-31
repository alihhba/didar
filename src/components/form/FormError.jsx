import React from 'react';
import {useFormFieldContext} from './FormField';
import {cn} from "@/lib/utils/index.jsx";

export function FormError({className , ...props}) {
    const { error } = useFormFieldContext();
    if (!error) return null;
    return <span className={cn('text-sm text-red-600', className)} {...props} >{error.message}</span>;
}
