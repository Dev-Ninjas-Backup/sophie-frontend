

import { useAuth } from "@/(dashboard)/auth/AuthContext"
import type React from "react"

import { Navigate } from "react-router"
import { toast } from "react-toastify"


export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    )
  }

  if (!user) {
    toast.warning("You must be logged in to access the dashboard")
    return <Navigate to="/dashboard/login" replace />
  }

  return <>{children}</>
}