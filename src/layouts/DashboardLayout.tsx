import { AuthProvider } from "@/(dashboard)/auth/AuthContext"
import { Outlet } from "react-router"


const DashboradLayout = () => {
  return (
     <div className="bg-black min-h-[100vh] italic font-abc-regular">
      <div className=" italic font-abc-regular">
        <AuthProvider>
            <Outlet />
            </AuthProvider> 
      </div>
    </div>
  )
}

export default DashboradLayout