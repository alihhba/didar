import React, {createContext, useContext} from 'react';
import {useFormContext} from 'react-hook-form';
import {Form} from "@/components/form/Form.jsx";
import {cn} from "@/lib/utils/index.jsx";
import {useTranslation} from "react-i18next";

const FormFieldContext = createContext(undefined);

export function useFormFieldContext() {
    const context = useContext(FormFieldContext);
    if (!context) {
        throw new Error('Form field components must be used within a <Form.Field>.');
    }
    return context;
}

export function FormField({name,showLabel = false , label = '', children, className, ...props}) {
    const {formState: {errors} , watch} = useFormContext();
    const fieldError = errors[name];
    const {t} = useTranslation();

    return (
        <FormFieldContext.Provider value={{name, error: fieldError}}>
            <div className={cn('flex justify-start flex-col w-full', className)} {...props}>
                <Form.Label className='mb-0.5 ms-1.5'>{t(label)}</Form.Label>
                <div>
                    {children}
                    <div className={'min-h-6 -mt-1'}>
                        <Form.Error/>
                    </div>

                </div>
            </div>
        </FormFieldContext.Provider>
    );
}
