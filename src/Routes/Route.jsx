import { createBrowserRouter } from "react-router";
import Root from "../components/Root/Root";
import Home from "../components/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import BookDetails from "../pages/BookDetails/BookDetails";
import AllBooks from "../pages/AllBooks/AllBooks";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import MyOrders from "../pages/Dashboard/User/MyOrders";
import MyProfile from "../pages/Dashboard/Shared/MyProfile";
import Invoices from "../pages/Dashboard/User/Invoices";
import AddBook from "../pages/Dashboard/Librarian/AddBook";
import MyBooks from "../pages/Dashboard/Librarian/MyBooks";
import LibrarianOrders from "../pages/Dashboard/Librarian/LibrarianOrders";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import ManageAllBooks from "../pages/Dashboard/Admin/ManageAllBooks";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/books",
        element: <AllBooks></AllBooks>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          {
            path: "profile",
            element: <MyProfile />,
          },
          // User Routes
          {
            path: "my-orders",
            element: <MyOrders />,
          },
          {
            path: "invoices",
            element: <Invoices />,
          },
          // Librarian Routes
          {
            path: "books",
            element: <MyBooks />,
          },
          {
            path: "add-book",
            element: <AddBook />,
          },
          {
            path: "issued-books",
            element: <LibrarianOrders />, // Reusing for now as placeholder
          },
          {
            path: "returns",
            element: <LibrarianOrders />, // Reusing for now
          },
          // Admin Routes
          {
            path: "users",
            element: <AllUsers />,
          },
          {
            path: "all-books",
            element: <ManageAllBooks />,
          },
          {
            path: "orders",
            element: <LibrarianOrders />, // Shared for now
          }
        ]
      },
      {
        path: "/book/:id",
        element: <BookDetails></BookDetails>,
      },
    ],
  },
]);
