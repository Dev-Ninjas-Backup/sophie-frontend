import type React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import googleImg from "@/assets/payment/Google.png"
import visaImg from "@/assets/payment/visa.svg"
import mastercardImg from "@/assets/payment/masterCard.svg"
import stripeImg from "@/assets/payment/Stripe.png"

interface StepTwoProps {
  data: {
    cardholderName: string
    cardNumber: string
    expireDate: string
    cvc: string
    paymentMethod: string
    validity: string
  }
  onChange: (data: any) => void
  onBack: () => void
  onSubmit: () => void
}

const StepTwo: React.FC<StepTwoProps> = ({ data, onChange, onBack, onSubmit }) => {
  const handleChange = (field: string, value: string) => {
    onChange({ [field]: value })
  }

  const handlePaymentMethodChange = (method: string) => {
    onChange({ paymentMethod: method })
  }


  const isValid = data.cardholderName && data.cardNumber && data.expireDate && data.cvc

  return (
      <div className="">

      {/* Payment Summary */}
      <h3 className="text-lg lg:text-xl font-abc-light pb-4 border-b-gray-700 border-b">Payment Summary:</h3>
      <div className=" mt-4 mb-4 space-y-2 pb-4 border-b-gray-700 border-b">
        

        <div className="bg-[#2b2b2b] p-4 rounded-xl">
            <div className="flex justify-between items-center pb-4 ">
          <p className="text-lg lg:text-xl ">Membership Fees:</p>
          <p className="text-lg lg:text-xl  text-white">300 NIS</p>
        </div>

        <div className="flex justify-between items-center ">
          <p className="text-lg lg:text-xl ">Validity:</p>
           <div>
            <select
      value={data.validity}             
      onChange={(e) => handleChange("validity", e.target.value)}  
      className="bg-[#2B2B2B] border border-transparent rounded-lg px-3 py-2
                 text-white text-lg lg:text-xl focus:ring-1 focus:ring-[#F80B58] focus:outline-none"
    >
      <option className="text-black text-lg lg:text-xl" value="1 year">For 1 year</option>
      <option className="text-black text-lg lg:text-xl" value="2 years">For 2 years</option>
      <option className="text-black text-lg lg:text-xl" value="3 years">For 3 years</option>
    </select>
           </div>
        </div>
        </div>
         <div className="bg-[#2b2b2b] p-4 rounded-xl">
             <div className="flex justify-between items-center ">
                <p className="text-lg lg:text-xl font-abc-light">Total Payable</p>
                <p className="text-xl font-bold text-orange-400">₪ 300</p>
              </div>
         </div>
      </div>

      {/* Payment Method */}
      <div className="mb-8">
        <h3 className="text-lg lg:text-xl font-abc-light mb-4">Payment Method</h3>
        <div className="flex flex-wrap items-center gap-6 items-center">
          {[
            { id: "stripe", label: "stripe", icon: stripeImg },
            { id: "visa", label: "VISA", icon: visaImg },
            { id: "mastercard", label: "Mastercard", icon: mastercardImg },
            { id: "gpay", label: "G Pay", icon: googleImg  },
          ].map((method) => (
            <label key={method.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={data.paymentMethod === method.id}
                onChange={() => handlePaymentMethodChange(method.id)}
                 className="
                            w-5 h-5
                            cursor-pointer
                            appearance-none
                            border-2 border-gray-300
                            rounded-full
                            checked:bg-[#F80B58]
                            checked:border-[#FFFFFF]
                            transition-colors duration-200
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F80B58]
                        "
              />
             <div className="flex  gap-1">
                 <img src={method.icon} alt="" className=""/>
                 <span className="font-bold">{method.id === "gpay" && "Pay"}</span>
             </div>
            </label>
          ))}
        </div>
      </div>

      {/* Card Details */}
      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-lg lg:text-xl font-abc-light mb-2">Cardholder Name:</label>
          <Input
            type="text"
            placeholder="Enter name on card"
            value={data.cardholderName}
            onChange={(e) => handleChange("cardholderName", e.target.value)}
            className="!bg-[#2b2b2b] border-0 focus:!ring-1 focus:!ring-[#F80B58] text-white placeholder-gray-600 text-base lg:text-lg   h-12"
          />
        </div>

       {/* Card Number */}
<div>
  <label className="block text-lg lg:text-xl font-abc-light mb-2">Card Number:</label>
  <div className="flex gap-2">
    {Array.from({ length: 4 }).map((_, idx) => {
      const segment = data.cardNumber.split(" ")[idx] || "";
      return (
        <Input
          key={idx}
          type="text"
          maxLength={4}
          value={segment}
          placeholder="-  -  -  -"
          onChange={(e) => {
            let val = e.target.value.replace(/\D/g, "").slice(0, 4);
            const segments = data.cardNumber.split(" ");
            segments[idx] = val;
            const formatted = segments.join(" ").trim();
            handleChange("cardNumber", formatted);
          }}
          className="!bg-[#2b2b2b] border-0 focus:!ring-1 focus:!ring-[#F80B58] text-white placeholder-gray-600 text-base lg:text-lg   h-12 text-center"
        />
      );
    })}
  </div>
</div>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-lg lg:text-xl font-abc-light mb-2">Expire Date:</label>
            <Input
              type="date"
              placeholder="Enter Date"
              value={data.expireDate}
              onChange={(e) => handleChange("expireDate", e.target.value)}
              className="!bg-[#2b2b2b] border-0 focus:!ring-1 focus:!ring-[#F80B58] text-white placeholder-gray-600 text-base lg:text-lg   h-12"
            />
          </div>
          <div>
            <label className="block text-lg lg:text-xl font-abc-light mb-2">CVC:</label>
            <Input
              type="number"
              placeholder="-  -  -"
              maxLength={3}
              value={data.cvc}
              onChange={(e) => handleChange("cvc", e.target.value)}
              className="!bg-[#2b2b2b] border-0 focus:!ring-1 focus:!ring-[#F80B58] text-white placeholder-gray-600 text-base lg:text-lg   h-12"
            />
          </div>
        </div>
      </div>

      {/* Privacy Policy Checkbox */}
      <div className="flex items-center gap-3 mb-8">
<Checkbox
  className="w-5 h-5  border border-[#FFFFFF] border-2 rounded transition-colors duration-200
             data-[state=checked]:bg-[#F80B58] data-[state=checked]:border-[#FFFFFF] cursor-pointer"
/>


        <span className="text-sm ">I agree to the privacy policy & terms of service.</span>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="px-10 py-5 text-lg md:text-xl-2 rounded-full !bg-white text-black font-semibold hover:bg-gray-200 cursor-pointer"
        >
          Back
        </Button>
        <Button
          onClick={onSubmit}
          disabled={!isValid}
          className="px-10 py-5 text-lg md:text-xl rounded-full bg-[#F80B58] text-white font-semibold hover:bg-[#F80B5899] disabled:opacity-50 cursor-pointer"
        >
          Pay & Register
        </Button>
      </div>
    </div>
  )
}

export default StepTwo
