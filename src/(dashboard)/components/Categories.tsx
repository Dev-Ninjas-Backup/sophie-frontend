

import { useState, useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "@/lib/baseUrl"
import DSkeletonTable from "./SkeletonTable"
import Swal from "sweetalert2"
// import withReactContent from "sweetalert2-react-content"

interface Category {
  id: string
  name: string
  partners: any[]
}

export default function DCategories() {
  // const MySwal = withReactContent(Swal)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [createLoading, setCreateLoading] = useState(false)
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}/categories`, { withCredentials: true })
      setCategories(response.data.data || [])
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch categories")
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    setCreateLoading(true)
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      await axios.post(`${BASE_URL}/categories`, { name }, { withCredentials: true })
      setSuccess("Category created successfully")
      setName("")
      fetchCategories()
      setCreateLoading(false)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create category")
      setCreateLoading(false)
    }
  }

const handleDelete = async (id: string) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    reverseButtons: true,
    background: "#121212", // dark background
    color: "#fff", // text color
    confirmButtonColor: "#F80B58",
    cancelButtonColor: "#888",
  })

  if (result.isConfirmed) {
    try {
      await axios.delete(`${BASE_URL}/categories/${id}`, { withCredentials: true })
      setSuccess("Category deleted successfully")
      fetchCategories()
      Swal.fire({
        title: "Deleted!",
        text: "Category has been deleted.",
        icon: "success",
        background: "#121212",
        color: "#fff",
        confirmButtonColor: "#F80B58",
      })
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete category")
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || "Failed to delete category",
        icon: "error",
        background: "#121212",
        color: "#fff",
        confirmButtonColor: "#F80B58",
      })
    }
  }
}


  return (
    <div className="space-y-6">
      {/* Create Category */}
      <div className="bg-[#1a1a1a] shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Create Category</h2>
        {error && <div className="mb-4 p-3 bg-[#F80B58]/20 text-[#F80B58] rounded text-sm">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-800 text-green-400 rounded text-sm">{success}</div>}

        <form onSubmit={handleCreate} className="flex gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
            required
            className="flex-1 px-3 py-2 bg-[#121212] border border-[#F80B58]/40 rounded-md shadow-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F80B58]"
          />
          <button
            type="submit"
            disabled={createLoading}
            className="px-6 py-2 bg-[#F80B58] text-white rounded-md hover:bg-[#F80B5899] transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
          >
           {createLoading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>

      {/* Categories Table */}
      <div className="bg-[#1a1a1a] shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-[#F80B58]">
          <h2 className="text-lg font-semibold text-white">Categories</h2>
        </div>
        {loading ? (
            <DSkeletonTable rows={8} columns={3} />
        ) : (
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-[#121212]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Partners</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">

              {
                categories.length === 0 ?  <tr><td></td><td className="text-center text-gray-400 px-6 py-4">No Category Available</td></tr> :
              categories.map((category) => (
                <tr key={category.id} className="hover:bg-[#121212] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{category.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{category.partners?.length || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
