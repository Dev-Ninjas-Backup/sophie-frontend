
import type { Category } from '../Partners'

const Categories = ({partnerCategories} : {partnerCategories : Category[]}) => {
  return (
    <div>
          <div className="space-y-12 font-abc-light ">
          {partnerCategories.map((category, index: number) => (
            <div key={index} className="text-center">
              {/* Category Name */}
              <div  
                  className={`inline-block border !border-[${category.color}] border-2 rounded-full px-9.5 py-2 mb-6`}
                  style={{ borderColor: category.color }}
               >
                <p 
                  style={{ color: category.color }}
                  className={`text-[${category.color}]  italic  text-base md:text-lg lg:text-xl  xl:text-xl`}
                >
                {category.name}
                </p>
              </div>
{/* 
              <div className='pb-2' >
                <p 
                  style={{ color: category.color }}
                  className={`text-[${category.color}]  italic  text-base md:text-lg lg:text-xl  xl:text-2xl`}
                >
                {category.name}
                </p>
              </div> */}

              {/* Businesses List */}
              <div className="space-y-2 text-white  text-base md:text-lg lg:text-xl  xl:text-xl  leading-none">
                {category.businesses.map((business, idx) => (
                  <p key={idx} className="italic">
                    {business}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Categories