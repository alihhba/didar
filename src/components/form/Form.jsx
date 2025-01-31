// Form.jsx
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';

import {FormField} from './FormField';
import {FormLabel} from './FormLabel';
import {FormInput} from './FormInput';
import {FormError} from './FormError';
import {FormTextarea} from '@/components/form/FormTextarea.jsx';
import {FormEmail} from '@/components/form/FormEmail.jsx';
import {FormMobile} from '@/components/form/FormMobile.jsx';
import {FormRadioGroup} from "@/components/form/FormRadioGroup.jsx";
import {FormCheckboxGroup} from "@/components/form/FormCheckboxGroup.jsx";
import {FormCheckbox} from "@/components/form/FormCheckbox.jsx";
import {FormFile} from "@/components/form/FormFile.jsx";
import {FormSelect} from "@/components/form/FormSelect.jsx";
import {cn} from '@/lib/utils/index.jsx';

function extendSchemaFromChildren(children, initialSchema) {
    let schema = initialSchema;
    React.Children.forEach(children, (child) => {
        if (!child) return;

        if (child.type === Form.Field) {
            const {name} = child.props;
            const fieldChild = React.Children.only(child.props.children);
            const fieldComponent = fieldChild?.type;

            if (fieldComponent) {
                if (fieldComponent.schema) {
                    schema = schema.extend({[name]: fieldComponent.schema});
                } else if (fieldComponent?.buildSchema && fieldChild.props.allowedValues) {
                    const fieldSchema = fieldComponent.buildSchema(fieldChild.props.allowedValues);
                    schema = schema.extend({[name]: fieldSchema});
                }
            }
        } else if (child.props && child.props.children) {
            schema = extendSchemaFromChildren(child.props.children, schema);
        }
    });
    return schema;
}

export function Form({schema, onSubmit, className , defaultValues, children}) {
    let finalSchema = schema || z.object({});
    finalSchema = extendSchemaFromChildren(children, finalSchema);

    const methods = useForm({
        resolver: zodResolver(finalSchema),
        mode: 'onChange',
        defaultValues
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className={cn('flex flex-col w-full' , className)}>
                {children}
            </form>
        </FormProvider>
    );
}

Form.Field = FormField;
Form.Label = FormLabel;
Form.Input = FormInput;
Form.Error = FormError;
Form.Textarea = FormTextarea;
Form.Email = FormEmail;
Form.Mobile = FormMobile;
Form.RadioGroup = FormRadioGroup;
Form.CheckboxGroup = FormCheckboxGroup;
Form.Checkbox = FormCheckbox;
Form.File = FormFile;
Form.Select = FormSelect;
// Form.MonthCalender = FormMonthCalender;



