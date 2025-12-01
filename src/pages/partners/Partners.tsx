import type React from "react"
import Categories from "./_components/Categories"
import AppButton from "../Home/_components/AppButton"
import { useNavigate } from "react-router"
import { useEffect } from "react"

export type Category = {
  name: string
  color: string
  businesses: string[]
}

const Partners: React.FC = () => {
const navigate = useNavigate()

  useEffect(()=>{
    document.title = "Partners | OLIM PASS"
  }, [])
  

  const partnerCategories : Category[] = [
    {
      name: "Fitness & Sports",
      color: "#F80B58",
      businesses: [
        "Golf Caesarea - 15% off first 3 visits",
        "Tazuz - 15 NIS off each league sign up",
        "Gordon Pool - Free Day Pass + 1 guest",
        "Playground - 1st Group Class Free",
        "Yoga with Davida - 1st Group Class Free",
        "Fight TLV - 10% off first 3 classes",
        "The Bloc Climbing Gym - 10% off any purchase/visit",
        "TLV Bikes - 100 NIS off any bike purchase",
        "Karki Store - 250 NIS off scooter purchase",
      ],
    },
    {
      name: "Beauty & Wellness",
      color: "#CB4F1C",
      businesses: [ 
        "Odelia Ben Hur Cosmetics - 20% off first 3 visits",
        "Tel Aviv Acupuncture - 15% off first visit",
        "OnCurl Salon - 50NIS off first appointment",
        "Kim HeadSpa - Extra 30 min free with treatment",
        "Fire&Ice - 15% off first 3 visits",
        "SigellT Waxing and Laser - 25% off first 3 visits.",
      ],
    },
    {
      name: "Activities",
      color: "#37CEDA",
      businesses: [
        "Golf Caesarea - 10% off first Round",
        "ClayforTLV - 10% off first 3 pottery pieces",
        "Citrus&Salt Cooking - 270 NIS vs. 310 NIS",
        "Topsea Surfing Center - First Rental Free",
      ],
    },
    {
      name: "Travel & Accommodations",
      color: "#94C912",
      businesses: [
        "Hotel Drensgoff - 10% off first stay (min 2 nights)",
        "SunCar - 10% off first 3 rentals",
        "Best Car Rental - 100 NIS off first rental",
      ],
    },
    {
      name: "Food & Drinks",
      color: "#DB2524",
      businesses: [
        "Tal Miznon - 10% off with membership",
        "Opa Pizza - 10% off per visit",
        "Nomadic Wellness - 10% Offa one time visit or membership",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white py-10  px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-5xl text-center mb-12 md:text-6xl lg:text-7xl xl:text-8xl font-abc-heavy-3  bold-stroke-3 leading-9 md:leading-12 lg:leading-15 xl:leading-19 tracking-[-2px]  xl:tracking-[-4px] ">PARTNERS</h1>

        {/* Partner Categories */}
      <Categories partnerCategories={partnerCategories} />

        {/* Sign Up Button */}
        <div className="flex justify-center mt-16">
          <AppButton onClick={()=>navigate("/register")} color="#F80B58">
          SIGN UP
        </AppButton>
        </div>
      </div>
    </div>
  )
}

export default Partners
