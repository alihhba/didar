import React from 'react';
import {useFormContext} from 'react-hook-form';
import {useFormFieldContext} from './FormField';
import {cn} from '@/lib/utils/index.jsx';
import {Check} from 'lucide-react';
import {z} from 'zod';

export function FormCheckbox({ className, label, ...props }) {
    const { name } = useFormFieldContext();
    const { register  , watch } = useFormContext();
    const isChecked = watch(name);

    return (
        <label className={cn('inline-flex items-center gap-4 cursor-pointer relative ', className)} {...props}>
            <input
                type="checkbox"
                {...register(name)}
                className="hidden peer"
            />
            {/* Custom Checkbox */}
            <span className={cn(
                "w-5 h-5 border-2 border-primary-500  rounded-md flex justify-center items-center transition-colors duration-200",
                isChecked ? "bg-primary-500 border-primary-500" : ""
            )}>
                            {isChecked && <Check className="text-white-500 absolute  w-3 h-3  "/>}
                        </span>
            {label && <span className="text-gray-700 dark:text-white-500">{label}</span>}
        </label>
    );
}

FormCheckbox.schema = z.boolean();
