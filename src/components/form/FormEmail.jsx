import React from 'react';
import {useFormFieldContext} from './FormField';
import {cn} from '@/lib/utils/index.jsx';
import {useFormContext} from 'react-hook-form';
import {z} from "zod";
import CustomInput from "@/components/ui/CustomInput.jsx";
import Icons from "@/lib/utils/Icons.js";



export function FormEmail({className, ...props}) {
    const {name} = useFormFieldContext();
    const {register} = useFormContext();
    const inputProps = register(name);

    return (
        <CustomInput
            id={name}
            type="text"
            icon={Icons.Message_curved}
            iconClassName={'text-greyScale-900 w-5 h-5'}
            dir={'ltr'}
            {...inputProps}
            {...props}
            className={cn(className)}
        />
    );
}

FormEmail.schema = z.string().email(localStorage.getItem('configLanguage')  === 'fa' ? "آدرس ایمیل نامعتبر است" : 'Invalid email address');
