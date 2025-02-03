import React, { useEffect, useState } from 'react';
import Page from "@/layouts/page/Page.jsx";
import Icon from "@/components/icons/Icon.jsx";
import icons from "@/lib/utils/icons.js";
import { useNavigate } from "react-router-dom";
import { Form } from "@/components/form/Form.jsx";
import useGetMe from "@/hooks/useGetMe.jsx";
import z from 'zod';
import Button from "@/components/ui/Button.jsx";
import useUpdateAuthMe from "@/hooks/useUpdateMe.jsx";

const EditAuthPage = () => {
    const navigate = useNavigate();
    const { user } = useGetMe();
    const {updateAuthMe} = useUpdateAuthMe()

    // Initially, defaultValues is null.
    const [defaultValues, setDefaultValues] = useState(null);

    useEffect(() => {
        if (user?.data) {
            setDefaultValues({
                email: user.data.email,
                phone: user.data.phone,
                first_name: user.data.first_name,
                last_name: user.data.last_name,
            });
        }
    }, [user]);

    const handleSubmit = async (value) => {
        try {
            await updateAuthMe(value)
            navigate(-1,{replace: true})
        } catch (err) {
            console.error('Error posting ticket:', err);
        }
    };


    const schema = z.object({
        email: z.string().min(1, 'فیلد الزامی'),
        phone: z.string().min(1, 'فیلد الزامی'),
        first_name: z.string().min(1, 'فیلد الزامی'),
        last_name: z.string().min(1, 'فیلد الزامی'),
    });

    // Render a loading state until defaultValues are ready.
    if (!defaultValues) {
        return <div>Loading...</div>;
    }

    return (
        <Page>
            <Page.Header>
                <div className="flex items-center gap-2.5">
                    <Icon
                        onClick={() => {
                            navigate(-1, { replace: true });
                        }}
                        icon={icons.back}
                        className="w-6 h-6"
                    />
                    <p className="text-gray-900 text-xl font-semibold">ویرایش اطلاعات</p>
                </div>
            </Page.Header>

            <Page.Content>
                <Form defaultValues={defaultValues} schema={schema} onSubmit={handleSubmit}>
                    <Form.Field name="phone" label="شماره تماس">
                        <Form.Input type="tell" />
                    </Form.Field>
                    <Form.Field name="email" label="ایمیل">
                        <Form.Input type="email" />
                    </Form.Field>
                    <Form.Field name="first_name" label="نام">
                        <Form.Input />
                    </Form.Field>
                    <Form.Field name="last_name" label="نام خانوادگی">
                        <Form.Input />
                    </Form.Field>

                    <Button type={
                        'submit'
                    } style="primary">
                        ذخیره
                    </Button>
                </Form>
            </Page.Content>
        </Page>
    );
};

export default EditAuthPage;
