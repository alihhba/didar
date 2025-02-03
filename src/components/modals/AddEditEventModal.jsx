import React, { useState } from 'react';
import Icon from "@/components/icons/Icon.jsx";
import icons from "@/lib/utils/icons.js";
import { useModal } from "@/context/modalContext.jsx";
import CustomInput from "@/components/ui/CustomInput.jsx";
import Button from "@/components/ui/Button.jsx";
import {Form} from "@/components/form/Form.jsx";
import usePostShedule from "@/hooks/usePostShedule.jsx";

const AddEditEventModal = () => {
    const { changeModalHandler } = useModal();
    const [title, setTitle] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const {postShedule} = usePostShedule()
    const [selectedDate, setSelectedDate] = useState("");

    const [editingField, setEditingField] = useState(null);

    const [hour, setHour] = useState("");
    const [min, setMin] = useState("");


    const handleAdd = async () => {
        try {
            const payload = {
                title: title,
                day_of_week: selectedDate,
                start_time: `${start}:00`,
                end_time: `${end}:00`
            }
            await postShedule(payload)

            changeModalHandler({isModal:false})
        } catch (err) {
            console.error('Error posting ticket:', err);
        }
    };



    const handleTimeConfirm = () => {
        if (editingField === "start") {
            setStart(`${hour}:${min}`);
        } else if (editingField === "end") {
            setEnd(`${hour}:${min}`);
        }
        setHour("");
        setMin("");
        setEditingField(null);
    };

    return (
        <div className="flex flex-col gap-y-4">
            <div
                onClick={() => changeModalHandler({ isModal: false })}
                className="ms-auto"
            >
                <Icon icon={icons.close} className="text-gray-900 w-6 h-6" />
            </div>

            {/* Time Entry Section */}
            {editingField ? (
                <div className="flex flex-col gap-4">
                    <p>ورود ساعت</p>
                    <div className="flex items-center gap-2 flex-row-reverse">
                        <CustomInput
                            value={hour}
                            onChange={(e) => setHour(e.target.value)}
                            placeholder="24"
                            label="ساعت"
                            type="tel"
                            maxLength={2}
                        />
                        <span className="pt-3 text-5xl">:</span>
                        <CustomInput
                            value={min}
                            onChange={(e) => setMin(e.target.value)}
                            placeholder="07"
                            label="دقیقه"
                            type="tel"
                            maxLength={2}
                        />
                    </div>
                    <div>
                        <Button onClick={handleTimeConfirm} style="primary">
                            تایید
                        </Button>
                    </div>
                </div>
            ) : (
                // Default view with title and time fields.
                <div className="flex flex-col gap-4">
                    <CustomInput
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="حضور در دفتر"
                        label="عنوان بخش"
                    />
                    <div className="flex items-center gap-x-2">
                        <CustomInput
                            value={start}
                            onClick={() => setEditingField("start")}
                            placeholder="07:00"
                            label="ساعت شروع"
                            type="text"
                        />
                        <CustomInput
                            value={end}
                            onClick={() => setEditingField("end")}
                            placeholder="09:00"
                            label="ساعت پایان"
                            type="text"
                        />
                    </div>


                    <Form>
                        <Form.Field name={'day'} label={'روز'}>
                            <Form.Select
placeholder={'شنبه'}
                                onchange  ={ (e)=>{
                                    setSelectedDate(e)
                                }}
                                options={[
                                {id: 1 , value: 1 , label:'شنبه'},
                                    {id: 2 , value: 1 , label:'یکشنبه'},
                                    {id: 3 , value: 1 , label:'دوشنبه'},
                                    {id: 4 , value: 1 , label:'سهشنبه'},
                                    {id: 5 , value: 1 , label:'چهارشنبه'},

                            ]}/>
                        </Form.Field>
                    </Form>

                    <Button onClick={handleAdd}
                            style="primary">
                        افزودن
                    </Button>
                </div>

            )}



        </div>
    );
};

export default AddEditEventModal;
