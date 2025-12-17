"use client"

import { useState } from "react"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"
import { PasswordInput } from "./PasswordInput"


export default function ResetPassword() {
  const navigate = useNavigate()

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required")
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match")
      return
    }

    try {
      setLoading(true)

      await axios.post(
        `${BASE_URL}/auth/reset-password`,
        {
          currentPassword: oldPassword,
          newPassword,
        },
        { withCredentials: true }
      )

      toast.success("Password reset successful. Please login again.")

      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      )

      localStorage.removeItem("user")
      navigate("/dashboard/login", { replace: true })
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to reset password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto  bg-[#121212] p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-white mb-4">
        Reset Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <PasswordInput
          label="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          show={showOld}
          toggleShow={() => setShowOld(!showOld)}
        />

        <PasswordInput
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          show={showNew}
          toggleShow={() => setShowNew(!showNew)}
        />

        <PasswordInput
          label="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          show={showConfirm}
          toggleShow={() => setShowConfirm(!showConfirm)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-[#F80B58] text-white rounded-md hover:bg-[#F80B5899] transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  )
}
