import { useState, useEffect } from "react"
import axios from "axios"
import DSkeletonTable from "./SkeletonTable"
import Pagination from "./PaginationProps"
import { BASE_URL } from "@/lib/baseUrl"

interface Registration {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  teudatZehut: string
  membershipId: string
  validFrom: string
  validTo: string
  isActive: boolean
  createdAt: string
}

interface PaginationData {
  data: Registration[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export default function DRegistrations() {
  const [paginationData, setPaginationData] = useState<PaginationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "inactive">("all")

  useEffect(() => {
    fetchRegistrations()
  }, [page, activeFilter])

  const fetchRegistrations = async () => {
    try {
      setLoading(true)

      let url = `${BASE_URL}/register?page=${page}&limit=${limit}`
      if (activeFilter === "active") url += "&isActive=true"
      if (activeFilter === "inactive") url += "&isActive=false"

      const response = await axios.get(url, { withCredentials: true })
      setPaginationData(response.data)
    } catch (err) {
      console.error("Failed to fetch registrations", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#1a1a1a] shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-[#F80B58] flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Registrations</h2>
        <select
          value={activeFilter}
          onChange={(e) => {
            setPage(1)
            setActiveFilter(e.target.value as "all" | "active" | "inactive")
          }}
          className="bg-[#121212] text-gray-300 px-3 py-1 rounded-md cursor-pointer"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {loading ? (
        <DSkeletonTable rows={limit} columns={8} />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-[#121212]">
                <tr>
                  {["Name","Email","Phone","Teudat Zehut","Membership ID","Valid Until","Status","Registered At"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {paginationData?.data.map((reg) => (
                  <tr key={reg.id} className="hover:bg-[#121212] transition-colors">
                    <td className="px-6 py-4 text-sm text-white">{reg.firstName} {reg.lastName}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{reg.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{reg.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{reg.teudatZehut}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{reg.membershipId}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{new Date(reg.validTo).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        reg.isActive ? "bg-green-700 text-white" : "bg-red-700 text-white"
                      }`}>
                        {reg.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">{new Date(reg.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Component */}
          <Pagination
            page={page}
            totalPages={paginationData?.totalPages || 0}
            totalItems={paginationData?.total || 0}
            onPageChange={(p) => setPage(p)}
            limit={limit}
          />
        </>
      )}
    </div>
  )
}
