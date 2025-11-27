import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Contact from "../pages/contact/Contact";
import Partners from "../pages/partners/Partners";
import Register from "@/pages/register/Register";
import RedeemPage from "@/pages/redeems/RedeemPage";

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
                element: <Register />
            } ,
            {
                path: "redeem",
                element: <RedeemPage />
            }
        ]
    }
])