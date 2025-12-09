import { createBrowserRouter } from "react-router";
import Root from "../components/Root/Root";
import Home from "../components/Home/Home";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import BookDetails from "../pages/BookDetails/BookDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/books/:id',
                element: <BookDetails></BookDetails>
            }
        ]
    }
]);