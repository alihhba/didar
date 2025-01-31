import HomePage from "@/pages/homePage/HomePage";
import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import useRegister from "@/hooks/useRegister.jsx";
import AuthPage from "@/pages/auth/AuthPage.jsx";
import Splash from "@/pages/splash/Splash.jsx";
import NavigationLayout from "@/layouts/NavigationLayout.jsx";
import StudentProfilePage from "@/pages/students/StudentProfilePage.jsx";
import ProfessorsPage from "@/pages/professor/ProfessorsPage.jsx";
import ProfessorPage from "@/pages/professor/ProfessorPage.jsx";
import MessagesPage from "@/pages/message/MessagesPage.jsx";
import MessagePage from "@/pages/message/MessagePage.jsx";
import ProfessorProfilePage from "@/pages/professor/ProfessorProfilePage.jsx";
import TasksPage from "@/pages/tasks/TasksPage.jsx";

const GuestRoutes = () => {
    const {isSplash, isRegister} = useRegister();
    const isInstructor = true;

    // splash
    if (isSplash) {
        return <Splash/>;
    }

    // not register routes
    if (!isRegister) {
        return (
            <Routes>
                <Route path="/auth" element={<AuthPage/>}/>
            </Routes>
        );
    }

    if (isRegister) {
        return (
            <Routes>
                <Route path={'/'} element={<NavigationLayout/>}>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/professors" element={<ProfessorsPage/>}/>
                    <Route path="/professor/:id" element={<ProfessorPage/>}/>
                    <Route path="/messages" element={<MessagesPage/>}/>
                    <Route path="/message/:id" element={<MessagePage/>}/>

                    {!isInstructor ? (
                        <Route path="/student" element={<StudentProfilePage/>}/>
                    ) : null}

                    {isInstructor ? (
                        <>
                            <Route path="/professor-profile" element={<ProfessorProfilePage/>}/>
                            <Route path="/tasks" element={<TasksPage/>}/>
                        </>
                    ) : null}


                    <Route path={'*'} element={<Navigate to={'/home'}/>}/>
                </Route>
            </Routes>
        );
    }


};

export default GuestRoutes;
