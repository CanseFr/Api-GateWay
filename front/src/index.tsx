import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Login } from "./login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Products} from "./products";
import {Register} from "./register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "register",
        element: <Register />,
    },
    {
        path: "products",
        element: <Products />,
    },
]);

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("L'élément HTML avec l'id 'root' est introuvable !");
}

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

reportWebVitals();
