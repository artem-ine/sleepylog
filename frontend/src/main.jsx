import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
// import SignUp from "./pages/Sign Up";
// import LogIn from "./pages/Log In";
import Dashboard from "./components/Dashboard";
import ErrorPage from "./pages/ErrorPage/index.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>
);
