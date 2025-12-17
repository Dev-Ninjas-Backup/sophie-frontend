
import { BASE_URL } from "@/lib/baseUrl"
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useAuth } from "@/(dashboard)/auth/AuthContext"
import { toast } from "react-toastify"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, { email, password } , { withCredentials: true })
      if (res.data.success) {
        // update auth context (also writes to localStorage inside the provider)
        login(res.data.user)

        if (res.data.user.role === "ADMIN") {
          toast.success(res.data.message)
          navigate("/dashboard", { replace: true })
        } else {
          toast.error("You are not authorized to access the admin dashboard")
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[90vh]  px-4">
      <div className="max-w-md w-full bg-[#121212] p-10 rounded-2xl shadow-2xl border border-[#F80B58]/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Admin Login</h2>
          <p className="mt-2 text-[#F80B58] font-medium">Welcome back! Please sign in.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-[#F80B58]/20 text-[#F80B58] p-3 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-[#2b2b2b] rounded-lg border border-[#F80B58]/40 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F80B58] transition duration-200"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[#2b2b2b] rounded-lg border border-[#F80B58]/40 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F80B58] transition duration-200"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 cursor-pointer rounded-full text-white bg-gradient-to-r from-[#F80B58] to-[#ff3b70] hover:from-[#ff4c7d] hover:to-[#ff2f5f] shadow-lg shadow-[#F80B58]/30 transition-all duration-200 font-semibold text-lg disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="text-center text-sm text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link to="/dashboard/signup" className="text-[#F80B58] font-medium hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
