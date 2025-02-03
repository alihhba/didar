/* eslint-disable react-hooks/exhaustive-deps */
import {useLocation, useNavigate} from 'react-router-dom'
import Icon from "@/components/icons/Icon.jsx";
import {cn} from "@/lib/utils/index.jsx";
import Icons from "@/lib/utils/icons.js";

const FixedMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const isInstructor = JSON.parse(localStorage.getItem('user-data'))?.is_instructor;


    const menuItems = [
        {
            id: 1,
            path: 'home',
            icon: Icons.home_menu,
            panel: ['student' , 'professor']
        },
        {
            id: 2,
            path: 'professors',
            icon: Icons.professors_menu,
            panel: ['student' , 'professor']
        },
        {
            id: 3,
            path: 'tasks',
            icon: Icons.tasks_menu,
            panel: ['professor']

        },
        {
            id: 4,
            path: isInstructor ? 'professor-profile' : 'student',
            icon: Icons.profile_menu,
            panel: ['student' , 'professor']
        },

    ];

    return (
        <div
            className="w-full relative py-2.5   h-full  rounded-t-full  flex items-center bg-white-500 dark:bg-dark-dark1 justify-around pt-3"
        >
            {menuItems.filter(a=> isInstructor ? a.panel.includes('professor'): a.panel.includes('student') ).map((item) => {
                const isActive = pathname.split('/')[1] === item.path;
                return (
                    <div
                        key={item.id}
                        onClick={() => {
                            navigate(item.path);
                        }}
                        className="flex flex-col gap-[3px] items-center justify-center py-[5px] "
                    >
                        <div className={'flex items-center justify-center '}>
                            <Icon
                                icon={item.icon}
                                className={cn('h-[50px] w-[42px] ' ,isActive  ? 'text-main-900' : 'text-gray-500' )}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FixedMenu;
