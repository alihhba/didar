import {Refine} from "@refinedev/core";

import routerBindings from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import {useState} from "react";
import {BrowserRouter} from "react-router-dom";
import "./App.css";
import "@/i18next.js"
import panels from "./core/panels";
import ContextProvider from "@/providers/contextProvider.jsx";
import ModalProviders from "@/providers/ModalProvider.jsx";

function App() {
    const [role] = useState(localStorage.getItem("role") || "student");

    const {resources, routes: Routes} = panels[role];
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                routerProvider={routerBindings}
                options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    useNewQueryKeys: true,
                    projectId: "Wk4wUz-4oGYwI-RrwEEi",
                }}
                resources={resources}
            >
                <ContextProvider>
                    <ModalProviders/>
                    <Routes/>
                </ContextProvider>
            </Refine>
        </BrowserRouter>
    );
}

export default App;
