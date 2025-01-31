import React, {useCallback} from 'react';
import {useFormContext} from 'react-hook-form';
import {useFormFieldContext} from './FormField';
import {cn} from '@/lib/utils/index.jsx';
import {Input} from '@/components/form/ui/Input.jsx';
import {z} from 'zod';
import CustomInput from "@/components/ui/CustomInput.jsx";

const mobileSchema = z.string().regex(/^09\d{9}$/, "لطفا شماره همراه را مشابه 09000000000 وارد نمایید.");

export function FormMobile({ className, ...props }) {
    const { name } = useFormFieldContext();
    const { register, setValue, watch } = useFormContext();
    const value = watch(name);

    const handleChange = useCallback((e) => {
        const cleaned = e.target.value.replace(/\D/g, '');
        setValue(name, cleaned, { shouldValidate: true, shouldDirty: true });
    }, [name, setValue]);

    const inputProps = register(name);

    return (
        <CustomInput
            id={name}
            dir={'ltr'}
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            {...inputProps}
            value={value ?? ''}
            onChange={handleChange}
            {...props}
            className={cn(className)}
        />
    );
}

FormMobile.schema = mobileSchema;
