import { useEffect } from "react"


const Contact = () => {

    useEffect(()=>{
      document.title = "Contact | OLIM PASS"
    }, [])
    

    const textClass = "text-white text-3xl sm:text-5xl   md:text-6xl leading-8  sm:leading-10 md:leading-14  lg:leading-16 xl:leading-12  tracking-[0px] sm:tracking-[-1px]  xl:tracking-[-2px] lg:text-7xl xl:text-8xl lg:leading-14 xl:leading-20 uppercase text-center font-extrabold italic "
  return (
    <div className="mt-26 flex flex-col items-center justify-center min-h-[50vh]">
        <p className={`${textClass} font-abc-ultra bold-stroke-3 `} >For more information</p>
        <p className={`${textClass} font-abc-ultra bold-stroke-3 `}>or to became a</p>
        <p className={`${textClass} font-abc-ultra bold-stroke-3 `}>partner please</p>
        <p className={`${textClass} font-abc-ultra-3 bold-stroke-3 `}>contact us at</p>
<a
  href="mailto:olimpass@gmail.com"
  className={`${textClass} !text-[#D405D9] !font-abc-ultra-3  bold-stroke-2 hover:underline`}
>
  olimpass@gmail.com
</a>

    </div>
  )
}

export default Contact