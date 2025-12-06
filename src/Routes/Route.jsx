import { createBrowserRouter } from "react-router";
import App from "../App";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App></App>,
        children: [
            {
                path: '/',
                element: <h1>Home</h1>
            }
        ]
    }
])