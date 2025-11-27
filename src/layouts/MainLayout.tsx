import { Outlet } from "react-router"
import Navbar from "../components/common/Navbar"


const MainLayout = () => {
  return (
     <div className="bg-black min-h-screen italic font-abc-regular">
      <Navbar />
      <div className="pt-30 lg:pt-32 xl:pt-34 italic font-abc-regular">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout