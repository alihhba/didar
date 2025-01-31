import React from 'react';
import {useFormContext} from 'react-hook-form';
import {useFormFieldContext} from './FormField';
import {cn} from '@/lib/utils/index.jsx';
import {z} from 'zod';

export function FormFile({ className, accept, multiple = false, ...props }) {
    const { name } = useFormFieldContext();
    const { register } = useFormContext();

    return (
        <input
            type="file"
            {...register(name)}
            accept={accept}
            multiple={multiple}
            className={cn(className)}
            {...props}
        />
    );
}

FormFile.buildSchema = () =>
    z.custom<FileList>((val) => {
        if (!val || !(val instanceof FileList)) return false;
        return val.length > 0;
    }, "Please select at least one file");
