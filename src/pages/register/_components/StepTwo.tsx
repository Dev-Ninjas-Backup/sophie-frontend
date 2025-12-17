import type React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import googleImg from "@/assets/payment/Google.png"
import visaImg from "@/assets/payment/visa.svg"
import mastercardImg from "@/assets/payment/masterCard.svg"
import stripeImg from "@/assets/payment/Stripe.png"
// import { useRef, useState } from "react"
import { toast } from "react-toastify"
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js"
import { useState } from "react"

interface StepTwoProps {
  data: {
    cardholderName: string
    paymentMethod: string
    validity: string
    token?: string
  }
  onChange: (data: any) => void
  onBack: () => void
  onSubmit: (token : string) => void
}

const StepTwo: React.FC<StepTwoProps> = ({ data, onChange, onBack, onSubmit }) => {



  const stripe = useStripe();
  const elements = useElements();
  const isStripeReady = stripe && elements;

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (field: string, value: string) => {
    onChange({ [field]: value })
  }

  const handlePaymentMethodChange = (method: string) => {
    onChange({ paymentMethod: method })
  }

  const handleClick = async () => {
    if (!isChecked) {
      toast.warn("Please agree to the privacy policy & terms of service.");
      return;
    }
    if (!stripe || !elements) {
      toast.error("Stripe is not loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast.error("Card element not found.");
      return;
    }

    // Token generate
    const { token, error } = await stripe.createToken(cardElement);
    if (error) {
      toast.error(error.message);
      return;
    }

    // Save token in parent state
    // onChange();

    // Submit the form
    onSubmit(token?.id );
  };

  // Validations (basic)
  const isValid =
    data.cardholderName &&
    data.validity;
    // data.token; // token will be generated before submitting

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
                className="bg-[#2B2B2B] border border-transparent rounded-lg px-3 py-2 text-white text-lg lg:text-xl focus:ring-1 focus:ring-[#F80B58] focus:outline-none"
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
            <p className="text-xl font-bold text-orange-400">₪ {Number(data.validity.split(" ")[0]) * 300 || 300}</p>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-8">
        <h3 className="text-lg lg:text-xl font-abc-light mb-4">Payment Method</h3>
        <div className="flex flex-wrap items-center gap-6">
          {[
            { id: "stripe", label: "stripe", icon: stripeImg },
            { id: "visa", label: "VISA", icon: visaImg },
            { id: "mastercard", label: "Mastercard", icon: mastercardImg },
            { id: "gpay", label: "G Pay", icon: googleImg },
          ].map((method) => (
            <label key={method.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={data.paymentMethod === method.id}
                onChange={() => handlePaymentMethodChange(method.id)}
                className="w-5 h-5 cursor-pointer appearance-none border-2 border-gray-300 rounded-full checked:bg-[#F80B58] checked:border-[#FFFFFF] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F80B58]"
              />
              <div className="flex gap-1">
                <img src={method.icon} alt="" className="" />
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
            className="!bg-[#2b2b2b] border-0 focus:!ring-1 focus:!ring-[#F80B58] text-white placeholder-gray-600 text-base lg:text-lg h-12"
          />
        </div>

        {/* Stripe CardElement */}
        <div>
          <label className="block text-lg lg:text-xl font-abc-light mb-2">Card Details:</label>
          <div className="bg-[#2b2b2b] rounded-xl p-3 text-white">
            <CardElement
              options={{
                style: {
                  base: {
                    color: "#ffffff",
                    fontSize: "16px",
                    "::placeholder": { color: "#888888" },
                  },
                  invalid: { color: "#ff4d4f" },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Privacy Policy Checkbox */}
      <div className="flex items-center gap-3 mb-8">
        <Checkbox
          checked={isChecked}
          onCheckedChange={(checked) => setIsChecked(!!checked)}
          className="w-5 h-5 border border-[#FFFFFF] border-2 rounded transition-colors duration-200 data-[state=checked]:bg-[#F80B58] data-[state=checked]:border-[#FFFFFF] cursor-pointer"
        />
        <span className="text-sm">I agree to the privacy policy & terms of service.</span>
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
          onClick={handleClick}
          disabled={!isValid || !isStripeReady}
          className="px-10 py-5 text-lg md:text-xl rounded-full bg-[#F80B58] text-white font-semibold hover:bg-[#F80B5899] disabled:opacity-50 cursor-pointer"
        >
          Pay & Register
        </Button>
      </div>
    </div>
  )
}

export default StepTwo
