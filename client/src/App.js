import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import axios from "axios";
import Navbar from './components/utils/navbar';
import Home from './components/home/home';
import Login from './components/auths/login';
import Register from './components/auths/register';
import ActivateAccount from "./components/utils/activateAccount";
import ResetPassword from "./components/utils/resetPassword";
import Books from "./components/bts/books";
import BooksByLevel from "./components/bts/booksByLevel";
import Book from "./components/bts/book";
import CreateFields from "./components/bts/createFields";

const Layout = ()=>{
  return (
    <>
    <Navbar />
    <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/auth/activate-account",
        element: <ActivateAccount />
      },
      {
        path: "/auth/reset-password",
        element: <ResetPassword />
      },
      {
        path: "/books",
        element: <Books />
      },
      {
        path: "/books/:level",
        element: <BooksByLevel />
      },
      {
        path: "/book/:name/:id",
        element: <Book />
      },
      {
        path: "/create-fields",
        element: <CreateFields />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
  
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
