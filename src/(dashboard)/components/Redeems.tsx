import { useState, useEffect } from "react"
import axios from "axios"
import DSkeletonTable from "./SkeletonTable"
import Pagination from "./PaginationProps" 
import { BASE_URL } from "@/lib/baseUrl"

interface Redeem {
  id: string
  redeemedAt: string
  registration: {
    firstName: string
    lastName: string
    email: string
    membershipId: string
  }
  partner: {
    name: string
    discount: string
    category: {
      name: string
    }
  }
}

interface PaginationData {
  data: Redeem[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export default function DRedeems() {
  const [paginationData, setPaginationData] = useState<PaginationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit] = useState(10)

  useEffect(() => {
    fetchRedeems()
  }, [page])

  const fetchRedeems = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}/redeem?page=${page}&limit=${limit}`, {
        withCredentials: true,
      })
      setPaginationData(response.data)
    } catch (err) {
      console.error("Failed to fetch redeems", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#1a1a1a] shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-[#F80B58]">
        <h2 className="text-lg font-semibold text-white">Redeems</h2>
      </div>

      {loading ? (
        <DSkeletonTable rows={limit} columns={7} />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-[#121212]">
                <tr>
                  {["User", "Email", "Membership ID", "Partner", "Discount", "Category", "Redeemed At"].map((h) => (
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
                {paginationData?.data.map((redeem) => (
                  <tr key={redeem.id} className="hover:bg-[#121212] transition-colors">
                    <td className="px-6 py-4 text-sm text-white">
                      {redeem.registration.firstName} {redeem.registration.lastName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">{redeem.registration.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{redeem.registration.membershipId}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{redeem.partner.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{redeem.partner.discount}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{redeem.partner.category.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(redeem.redeemedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* External Pagination Component */}
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
