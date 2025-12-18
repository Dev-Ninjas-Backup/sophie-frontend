import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Contact from "../pages/contact/Contact";
import Partners from "../pages/partners/Partners";
import Register from "@/pages/register/Register";
import RedeemPage from "@/pages/redeems/RedeemPage";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SignUp from "@/(dashboard)/auth/register/SingUp";
import DashboradLayout from "@/layouts/DashboardLayout";
import Login from "@/(dashboard)/auth/login/Login";
// import Dashboard from "@/(dashboard)/pages/dashboard";
// import Categories from "@/(dashboard)/components/Categories";
import PrivateRoute from "./PrivateRoutes";
import Dashboard from "@/(dashboard)/pages/Dashboard";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!)


export const Routes = createBrowserRouter([
    {
        path: "/" ,
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: "partners",
                element: <Partners />   
            } ,
            {
                path: "register",
                element:
                 <Elements stripe={stripePromise} > 
                    <Register />
                 </Elements>
            } ,
            {
                path: "redeem",
                element: <RedeemPage />
            },
            
        ]
    },
    {
                path: "dashboard",
                element:

                   <DashboradLayout />

 ,
                children: [
                    {
                        index: true,
                        element: <PrivateRoute > <Dashboard /> </PrivateRoute> 
                    },
                    {
                        path: "signup",
                        element: <SignUp />
                    },
                    {
                        path: "login",
                        element: <Login />
                    }
                ]
            }
])