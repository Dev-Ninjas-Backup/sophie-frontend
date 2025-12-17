import { useState, useEffect } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { BASE_URL } from "@/lib/baseUrl"
import DSkeletonTable from "./SkeletonTable"



interface Partner {
  id: string
  name: string
  discount: string
  categoryId: string
  maxRedeems: number
}

interface Category {
  id: string
  name: string
  partners: Partner[]
}

export default function DPartners() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState("")
    const [createLoading, setCreateLoading] = useState(false)
  const [name, setName] = useState("")
  const [maxRedeems, setMaxRedeems]= useState("")
  const [discount, setDiscount] = useState("")
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${BASE_URL}/categories`, { withCredentials: true })
      setCategories(res.data.data || [])
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch categories")
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePartner = async (e: React.FormEvent) => {
    setCreateLoading(true)
    e.preventDefault()
    if (!selectedCategoryId) return setError("Please select a category")
    setError(""); setSuccess("")

    try {
      await axios.post(`${BASE_URL}/partners`, {
        name,
        discount,
        categoryId: selectedCategoryId ,
        maxRedeems: parseInt(maxRedeems)
      }, { withCredentials: true })

      setSuccess("Partner created successfully")
      setName("")
      setDiscount("")
      fetchCategories()
      setMaxRedeems("")
      setCreateLoading(false)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create partner")
      setCreateLoading(false)
    }
  }

  const handleDeletePartner = async (partnerId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      background: "#121212",
      color: "#fff",
      confirmButtonColor: "#F80B58",
      cancelButtonColor: "#888"
    })

    if (!result.isConfirmed) return

    try {
      await axios.delete(`${BASE_URL}/partners/${partnerId}`, { withCredentials: true })
      setSuccess("Partner deleted successfully")
      fetchCategories()
      Swal.fire({
        title: "Deleted!",
        text: "Partner has been deleted.",
        icon: "success",
        background: "#121212",
        color: "#fff",
        confirmButtonColor: "#F80B58",
      })
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete partner")
    }
  }

  const selectedCategory = categories.find(c => c.id === selectedCategoryId)

  return (
    <div className="space-y-6">
      {/* Create Partner */}
      <div className="bg-[#1a1a1a] shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Create Partner</h2>
        {error && <div className="mb-4 p-3 bg-[#F80B58]/20 text-[#F80B58] rounded text-sm">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-800 text-green-400 rounded text-sm">{success}</div>}

        <form onSubmit={handleCreatePartner} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Partner name"
            required
            className="px-3 py-2 bg-[#121212] border border-[#F80B58]/40 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F80B58]"
          />
          <input
            type="text"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Discount"
            required
            className="px-3 py-2 bg-[#121212] border border-[#F80B58]/40 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F80B58]"
          />
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            required
            className="px-3 py-2 bg-[#121212] border border-[#F80B58]/40 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F80B58]"
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <input
                type="text"
                value={maxRedeems}
                onChange={(e) => setMaxRedeems(e.target.value)}
                placeholder="Max Redeems (e.g., 5)"
                required
                className="px-3 py-2 bg-[#121212] border border-[#F80B58]/40 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F80B58]"
            />


          <button disabled={createLoading} className="col-span-full sm:col-auto px-6 py-2 bg-[#F80B58] rounded-md text-white hover:bg-[#F80B5899] transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed">
             {createLoading ? "Creating..." : "Create Partner"}
          </button>
        </form>
      </div>

      {/* Partners Table */}
      <div className="bg-[#1a1a1a] shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-[#F80B58]">
          <h2 className="text-lg font-semibold text-white">Partners</h2>
        </div>
        {loading ? (
                  <DSkeletonTable rows={5} columns={5} />
        ) : (
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-[#121212]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Discount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Max Redeems</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {selectedCategory?.partners.map(partner => (
                <tr key={partner.id} className="hover:bg-[#121212] transition-colors">
                  <td className="px-6 py-4 text-sm text-white">{partner.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{partner.discount}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{selectedCategory.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{partner.maxRedeems}</td>
                  <td className="px-6 py-4 text-right text-sm">
                    <button
                      onClick={() => handleDeletePartner(partner.id)}
                      className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!selectedCategory?.partners.length && (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-gray-400 text-center">
                    {selectedCategoryId==="" ? "Please select a category to view partners" : "No partners found for this category."}  
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
