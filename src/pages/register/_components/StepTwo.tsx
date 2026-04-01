/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import googleImg from "@/assets/payment/Google.png";
import visaImg from "@/assets/payment/visa.svg";
import mastercardImg from "@/assets/payment/masterCard.svg";
import stripeImg from "@/assets/payment/Stripe.png";
import { toast } from "react-toastify";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";

interface StepTwoProps {
  data: {
    cardholderName: string;
    paymentMethod: string;
    validity: string;
    token?: string;
  };
  onChange: (data: any) => void;
  onBack: () => void;
  onSubmit: (token: string) => void;
}

const StepTwo: React.FC<StepTwoProps> = ({
  data,
  onChange,
  onBack,
  onSubmit,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const isStripeReady = stripe && elements;

  const [isChecked, setIsChecked] = useState(false);

  const plans = [
    {
      id: "1 year",
      title: "BASIC",
      price: 299,
      originalPrice: null,
      discount: null,
    },
    {
      id: "2 years",
      title: "STANDARD",
      price: 449,
      originalPrice: 598,
      discount: "25% discount",
    },
    {
      id: "3 years",
      title: "PREMIUM",
      price: 629,
      originalPrice: 897,
      discount: "30% discount",
    },
  ];

  const selectedPlan = plans.find((p) => p.id === data.validity);

  const handleChange = (field: string, value: string) => {
    onChange({ [field]: value });
  };

  const handlePaymentMethodChange = (method: string) => {
    onChange({ paymentMethod: method });
  };

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

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      toast.error(error.message);
      return;
    }

    onSubmit(token?.id as string);
  };

  // ✅ validation
  const isValid = data.cardholderName && data.validity && data.paymentMethod;

  return (
    <div>
      {/* ================= PLAN SELECTION ================= */}
      <h3 className="text-lg lg:text-xl font-abc-light pb-4 border-b-gray-700 border-b">
        Choose Your Plan:
      </h3>

      <div className="grid md:grid-cols-3 gap-6 mt-6 mb-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => handleChange("validity", plan.id)}
            className={`relative overflow-hidden cursor-pointer rounded-2xl p-6 text-center transition-all duration-300 border-2 
    ${
      data.validity === plan.id
        ? "border-[#F80B58] scale-105 shadow-[0_0_15px_rgba(248,11,88,0.3)]"
        : "border-transparent"
    }`}
            style={{ backgroundColor: "#2b2b2b" }}
          >
            {/* Diagonal Banner */}
            {plan.discount && (
              <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
                <div className="bg-[#F80B58] text-white text-[9px] font-bold py-1 w-[140px] absolute top-4 -right-10 rotate-45 shadow-md uppercase tracking-tighter">
                  {plan.discount}
                </div>
              </div>
            )}

            <h4 className="text-xl font-bold mb-4 tracking-wide">
              {plan.title}
            </h4>

            <div className="mb-4 flex flex-col items-center justify-center h-16">
              {/* Regular Price (Strikethrough) */}
              {plan.originalPrice && (
                <span className="relative text-gray-500 text-lg px-1 inline-block">
                  ₪ {plan.originalPrice}
                  {/* Custom 45-degree cross line */}
                  <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="w-full h-0.5 bg-[#F80B58] rotate-[-15deg]"></span>
                  </span>
                </span>
              )}
              {/* Discounted Price */}
              <p className="text-3xl font-bold text-white">₪ {plan.price}</p>
            </div>

            <p className="text-gray-400 text-sm mb-4">{plan.id}</p>

            <div
              className={`mt-4 py-2 rounded-full text-sm font-semibold transition-colors
      ${
        data.validity === plan.id
          ? "bg-[#F80B58] text-white"
          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
      }`}
            >
              {data.validity === plan.id ? "Selected" : "Select Plan"}
            </div>
          </div>
        ))}
      </div>

      {/* ================= TOTAL ================= */}
      <div className="bg-[#2b2b2b] p-4 rounded-xl mb-6">
        <div className="flex justify-between items-center">
          <p className="text-lg lg:text-xl font-abc-light">Total Payable</p>
          <p className="text-xl font-bold text-orange-400">
            ₪ {selectedPlan?.price || 299}
          </p>
        </div>
      </div>

      {/* ================= PAYMENT METHOD ================= */}
      <div className="mb-8">
        <h3 className="text-lg lg:text-xl font-abc-light mb-4">
          Payment Method
        </h3>

        <div className="flex flex-wrap items-center gap-6">
          {[
            { id: "stripe", icon: stripeImg },
            { id: "visa", icon: visaImg },
            { id: "mastercard", icon: mastercardImg },
            { id: "gpay", icon: googleImg },
          ].map((method) => (
            <label
              key={method.id}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="radio"
                name="payment"
                checked={data.paymentMethod === method.id}
                onChange={() => handlePaymentMethodChange(method.id)}
                className="w-5 h-5 cursor-pointer appearance-none border-2 border-gray-300 rounded-full checked:bg-[#F80B58] checked:border-white"
              />

              <img src={method.icon} alt="" />
            </label>
          ))}
        </div>
      </div>

      {/* ================= CARD ================= */}
      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-lg lg:text-xl font-abc-light mb-2">
            Cardholder Name:
          </label>

          <Input
            type="text"
            placeholder="Enter name on card"
            value={data.cardholderName}
            onChange={(e) => handleChange("cardholderName", e.target.value)}
            className="!bg-[#2b2b2b] border-0 focus:!ring-1 focus:!ring-[#F80B58] text-white h-12"
          />
        </div>

        <div>
          <label className="block text-lg lg:text-xl font-abc-light mb-2">
            Card Details:
          </label>

          <div className="bg-[#2b2b2b] rounded-xl p-3 text-white">
            <CardElement
              options={{
                style: {
                  base: {
                    color: "#ffffff",
                    fontSize: "16px",
                    "::placeholder": { color: "#888" },
                  },
                  invalid: { color: "#ff4d4f" },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* ================= CHECKBOX ================= */}
      <div className="flex items-center gap-3 mb-8">
        <Checkbox
          checked={isChecked}
          onCheckedChange={(checked) => setIsChecked(!!checked)}
          className="w-5 h-5 border-2 cursor-pointer border-white data-[state=checked]:bg-[#F80B58]"
        />
        <span className="text-sm">
          I agree to the privacy policy & terms of service.
        </span>
      </div>

      {/* ================= BUTTONS ================= */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="px-10 py-5 text-lg md:text-xl rounded-full cursor-pointer !bg-white text-black font-semibold hover:bg-gray-200"
        >
          Back
        </Button>

        <Button
          onClick={handleClick}
          disabled={!isValid || !isStripeReady}
          className="px-10 py-5 text-lg md:text-xl cursor-pointer rounded-full bg-[#F80B58] text-white font-semibold hover:bg-[#F80B5899] disabled:opacity-50"
        >
          Pay & Register
        </Button>
      </div>
    </div>
  );
};

export default StepTwo;
