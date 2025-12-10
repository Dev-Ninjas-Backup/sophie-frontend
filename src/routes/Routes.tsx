import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Contact from "../pages/contact/Contact";
import Partners from "../pages/partners/Partners";
import Register from "@/pages/register/Register";
import RedeemPage from "@/pages/redeems/RedeemPage";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!)


// console.log("Stripe key:", import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

//  const options = {
    // // passing the client secret obtained from the server
//     clientSecret: '{{CLIENT_SECRET}}',
//   };

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
                 <Elements stripe={stripePromise} 
                // options={options}
                > 
                <Register />
                 </Elements>
            } ,
            {
                path: "redeem",
                element: <RedeemPage />
            }
        ]
    }
])