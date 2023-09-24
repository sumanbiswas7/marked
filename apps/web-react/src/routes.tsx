import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/home";
import DashboardHomePage from "./pages/dashboard/home/home";
import SignupPage from "./pages/auth/signup/signup";
import LoginPage from "./pages/auth/login/login";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <HomePage />,
   },
   {
      path: "/dashboard",
      element: <DashboardHomePage />,
   },
   {
      path: "/auth/signup",
      element: <SignupPage />,
   },
   {
      path: "/auth/login",
      element: <LoginPage />,
   },
]);
