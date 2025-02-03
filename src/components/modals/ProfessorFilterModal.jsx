import React, {useEffect, useState} from 'react';
import useGetMe from "@/hooks/useGetMe.jsx";
import useFetchData from "@/hooks/useFetchData.jsx";
import Icon from "@/components/icons/Icon.jsx";
import icons from "@/lib/utils/icons.js";
import Button from "@/components/ui/Button.jsx";
import {cn} from "@/lib/utils/index.jsx";
import {Form} from "@/components/form/Form.jsx";
import useQuery from "@/hooks/useQuery.jsx";
import axios from "axios";
import {useModal} from "@/context/modalContext.jsx";

const ProfessorFilterModal = () => {
    const { data: facultiesData, loading: facultyLoading } = useFetchData(
        'http://localhost:8888/api/v1/faculties/'
    );
    const {changeModalHandler} =useModal();
    const {setQuery , clearQuery} = useQuery()
    const [showFaculty, setShowFaculty] = useState(false);
    const [showDepartments, setShowDepartments] = useState(false);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [departmentsData, setDepartmentsData] = useState(null);
    const [departmentLoading, setDepartmentLoading] = useState(false);

    const facultyRadioData = facultiesData?.data?.results.map((a) => ({
        id: a.id,
        value: a.id,
        label: a.name,
    }));

    useEffect(() => {
        if (!selectedFaculty) return;
        const fetchDepartments = async () => {
            setDepartmentLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:8888/api/v1/faculties/${selectedFaculty}/departments/`,
                    { withCredentials: true }
                );
                setDepartmentsData(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setDepartmentLoading(false);
            }
        };

        fetchDepartments();
    }, [selectedFaculty]);

    return (
        <div className="flex flex-col py-4 gap-2">
            {/* Faculty */}
            <div>
                <div
                    onClick={() => setShowFaculty(!showFaculty)}
                    className="flex items-center justify-between border-b border-gray-500 py-4"
                >
                    <p className="text-lg font-medium">دانشکده</p>
                    <Icon
                        icon={icons.chevron_left}
                        className={cn('w-2 h-2 transition-all', showFaculty ? '-rotate-90' : '')}
                    />
                </div>
                {showFaculty &&
                    (facultyLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <Form defaultValues={{faculty: 2}}>
                            <Form.Field name="faculty">
                                <Form.RadioGroup
                                    onChange={(e) => {
                                        setSelectedFaculty(e.target.value);
                                    }}
                                    options={facultyRadioData}
                                />
                            </Form.Field>
                        </Form>
                    ))}
            </div>

            {/* Department */}
            <div>
                <div
                    onClick={() => setShowDepartments(!showDepartments)}
                    className="flex items-center justify-between border-b border-gray-500 py-4"
                >
                    <p className="text-lg font-medium"> گروه آموزشی</p>
                    <Icon
                        icon={icons.chevron_left}
                        className={cn('w-2 h-2 transition-all', showDepartments ? '-rotate-90' : '')}
                    />
                </div>
                {showDepartments && (
                    <div>
                        {departmentLoading ? (
                            <p>Loading departments...</p>
                        ) : (
                            <Form>
                                <Form.Field name="department">
                                    <Form.RadioGroup
                                        onChange={(e) => {
                                            setSelectedDepartment(e.target.value)
                                        }}
                                        options={departmentsData?.data?.results.map((d) => ({
                                            id: d.id,
                                            value: d.id,
                                            label: d.name,
                                        }))}
                                    />
                                </Form.Field>
                            </Form>
                        )}
                    </div>
                )}
            </div>

            <div className="mt-2 flex items-center gap-x-2">
                <Button
                    onClick={()=>{
                        setQuery({department__faculty: selectedFaculty , department: selectedDepartment }  ,{replace: true});
                        changeModalHandler({isModal: false})

                    }}
                    className="w-full" style="primary">
                    اعمال
                </Button>
                <Button
                    onClick={()=>{
                   clearQuery({replace: true})
                        changeModalHandler({isModal: false})


                    }}
                    className="w-full" style="primary">
                    ریست
                </Button>
            </div>
        </div>
    );
};

export default ProfessorFilterModal;