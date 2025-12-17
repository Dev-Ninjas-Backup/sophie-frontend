import type { FC } from "react"

const CategoriesSkeleton: FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="space-y-12 animate-pulse font-abc-light">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="text-center">

          <div className="inline-block border-2 border-gray-600 rounded-full px-9.5 py-2 mb-6">
            <div className="h-5 w-40 md:w-52 bg-gray-700 rounded-full mx-auto" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="h-4 md:h-5 lg:h-6 w-56 md:w-72 lg:w-96 bg-gray-700 rounded mx-auto"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CategoriesSkeleton
