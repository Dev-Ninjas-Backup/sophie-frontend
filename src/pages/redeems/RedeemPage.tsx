import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RedeemSuccess from "./_components/RedeemSuccess";

export default function RedeemPage() {
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    document.title = "Redeem | OLIM PASS"
  }, [])
  
  return (
    <div className=" bg-[#0B0003] text-white flex flex-col items-center p-6">
      {/* Header */}
      <h1 className="text-5xl text-center mb-12 md:text-6xl lg:text-7xl xl:text-8xl font-abc-heavy-3  bold-stroke-3 leading-10 md:leading-12 lg:leading-15 xl:leading-19 tracking-[-1px]  xl:tracking-[-2px] ">
        MEMBERSHIP VALIDATION
      </h1>
      <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 mt-3 text-center max-w-4xl">
        Validate ID, browse partners and redeem ongoing discounts at gyms, coffee shops,
        restaurants, and local businesses for your first 3 years in Tel Aviv.
      </p>

      {/* Form */}
      <div className="bg-[#191919] mt-8 p-6 rounded-xl w-full max-w-4xl space-y-6 shadow-lg">
        <div>
          <Label className="text-sm lg:text-base font-semibold mb-2 block">
            Enter your Membership ID:
          </Label>
          <Input
            placeholder="Enter your 5 digit id"
            className="!bg-[#2b2b2b] border-0 focus:!ring-1 focus:!ring-[#F80B58] text-white placeholder-gray-600"
          />
        </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Category */}
  <div>
    <Label className="text-sm lg:text-base font-semibold mb-2 block">
      Select Category:
    </Label>

    <div className="bg-[#1E1E1E] rounded-lg p-0.5">
      <select
        className="w-full !bg-[#2B2B2B] border border-transparent rounded-lg px-3 py-2
                   text-white text-sm focus:ring-1 focus:ring-[#F80B58] focus:outline-none"
      >
        <option className="!text-black text-sm">Fitness & Sports</option>
      </select>
    </div>
  </div>

  {/* Business */}
  <div>
    <Label className="text-sm lg:text-base font-semibold mb-2 block">
      Select Business:
    </Label>

    <div className="bg-[#1E1E1E] rounded-lg p-0.5">
      <select
        className="w-full bg-[#2B2B2B] border border-transparent rounded-lg px-3 py-2
                   text-white text-sm focus:ring-1 focus:ring-[#F80B58] focus:outline-none"
      >
        <option className="text-black text-sm">Golf Caesarea - 15% off</option>
      </select>
    </div>
  </div>
</div>


        <button
          onClick={() => setOpen(true)}
          className="bg-[#F80B58] py-2 px-7 rounded-full font-semibold hover:bg-[#F80B58CC] transition cursor-pointer"
        >
          Redeem Discount
        </button>
      </div>

      {/* Success Dialog */}
        <RedeemSuccess open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
