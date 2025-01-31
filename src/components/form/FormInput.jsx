import React from 'react';
import {useFormContext} from 'react-hook-form';
import {useFormFieldContext} from './FormField';
import {cn} from "@/lib/utils/index.jsx";
import {Input} from "@/components/form/ui/Input.jsx";
import CustomInput from "@/components/ui/CustomInput.jsx";

export function FormInput({className, ...props}) {
    const { name  } = useFormFieldContext();
    const { register } = useFormContext();
    const inputProps = register(name);

    return <CustomInput id={name} {...inputProps} {...props} className={cn(className)} />;
}
