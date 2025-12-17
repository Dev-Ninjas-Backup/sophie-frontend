// components/Pagination.tsx

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  limit?: number
  totalItems?: number
}

export default function Pagination({ page, totalPages, onPageChange, limit = 10, totalItems }: PaginationProps) {
  if (totalPages === 0) return null

  return (
    <nav className="px-4 py-3 flex items-center justify-between border-t border-gray-700 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 rounded-md text-sm font-medium bg-[#121212] text-gray-300 hover:bg-[#222] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 rounded-md text-sm font-medium bg-[#121212] text-gray-300 hover:bg-[#222] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-400">
            Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{" "}
            <span className="font-medium">{Math.min(page * limit, totalItems || 0)}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <div className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className="px-2 py-2 rounded-l-md bg-[#121212] text-gray-400 hover:bg-[#222] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-4 py-2 border text-sm font-medium cursor-pointer ${
                  pageNum === page
                    ? "z-10 bg-[#F80B58] border-[#F80B58] text-white"
                    : "bg-[#121212] border-gray-700 text-gray-400 hover:bg-[#222]"
                }`}
              >
                {pageNum}
              </button>
            ))}
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
              className="px-2 py-2 rounded-r-md bg-[#121212] text-gray-400 hover:bg-[#222] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
