
import FeatureCard from "./_components/FeatureCard";
import AppButton from "./_components/AppButton";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate()

  useEffect(()=>{
    document.title = "OLIM PASS"
  })
  const features = [
    {
      color: "#000000",
      text: "An exclusive membership for new residents in Israel.",
    },
    {
      color: "#000000",
      text: "Receive ongoing discounts at gyms, coffee shops, restaurants, and local businesses for your first 3 years in Tel Aviv.",
    },
    {
      color: "#000000",
      text: "Browse our partners and sign up with your Teudat Zehut.",
    },
  ];

// 
  return (
    <main className="pb-20 mt-14 px-4 flex flex-col justify-between min-h-[78vh] sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Hero Section */}
<div className="text-center mb-12 lg:mb-16 text-white ">
  <h1
  //      style={{
  //   fontFamily: '"ABC Diatype Ultra", sans-serif',
  //   fontWeight: 1000,
  //   color: "#FFFFFF", // text color
  //   textShadow: "0 0 0 #FFFFFF, 3px 0 0 #FFFFFF, 0 3px 0 #FFFFFF, 3px 3px 0 #FFFFFF"
  // }} 
  className="text-5xl  md:text-6xl lg:text-7xl xl:text-8xl font-abc-heavy-3  bold-stroke-3 leading-9 md:leading-12 lg:leading-15 xl:leading-19 tracking-[-1px]  xl:tracking-[-2px] mb-0">
    OLIM PASS.
  </h1>

  <h2 className="text-3xl md:text-5xl lg:text-[65px] xl:text-[80px] font-abc-light leading-9 md:leading-12 lg:leading-15 xl:leading-19 tracking-[-1px] md:tracking-[-3px]  xl:tracking-[-5px] mt-1 !font-light">
    <span className="block">WELCOME TO ISRAEL,</span>
    <span className="block">NOW HERE'S A DISCOUNT.</span>
  </h2>
  
</div>




      {/* Feature Cards */}
     <div className="flex justify-center">
       <div className="flex flex-col max-w-5xl px-6  justify-center items-center text-center gap-1 mb-12">
        {features.map((item, index) => (
          <FeatureCard key={index} color={item.color}>
            {item.text}
          </FeatureCard>
        ))}
      </div>
     </div>

      {/* CTA Buttons */}
     <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <AppButton onClick={()=>navigate("/register")} color="#F80B58">
          SIGN UP
        </AppButton>

        <AppButton  onClick={()=>navigate("/partners")} color="#FF9200">
          PARTNERS
        </AppButton>
      </div>
    </main>
  );
};

export default Home;
