import type React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import StepOne from "./_components/StepOne";
import StepTwo from "./_components/StepTwo";
import PaymentProcessing from "./_payments/PaymentProcessingProps";
import PaymentSuccess from "./_payments/PaymentSuccess";
import { toast } from "react-toastify";
import { useStripe } from "@stripe/react-stripe-js";
import { BASE_URL } from "@/lib/baseUrl";
// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!)



export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  teudatZehut: string;
  dateOfAliyah: string;
  cardholderName: string;
  cardNumber: string;
  expireDate: string;
  cvc: string;
  paymentMethod: string;
  validity: string;
}

const Register: React.FC = () => {
  useEffect(() => {
    document.title = "Register | OLIM PASS";
  }, []);

  const stripe = useStripe();
// const elements = useElements();

  const [currentStep, setCurrentStep] = useState(1);
  const [showProcessing, setShowProcessing] = useState(false);
  const [avalableDate , setAvalableDate] = useState("")
  const [validDate , setValidDate] = useState("")
  const [activeStatus , setActiveStatus] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false);
  const [membershipId, setMembershipId] = useState("");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    teudatZehut: "",
    dateOfAliyah: "",
    cardholderName: "",
    cardNumber: "",
    expireDate: "",
    cvc: "",
    paymentMethod: "stripe",
    validity: "",
  });
  // const [error, setError] = useState<string>("");

  const handleStepOneChange = (data: Partial<FormData>) => {
    setFormData({ ...formData, ...data });
  };

  const handleStepTwoChange = (data: Partial<FormData>) => {
    setFormData({ ...formData, ...data });
  };

  const handleContinue = () => setCurrentStep(2);
  const handleBack = () => setCurrentStep(1);

  // console.log(BASE_URL , "url")

const pollRegistration = async (registrationId: string, interval = 2000, maxRetries = 15) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
    
      const checkRes = await axios.get(`${BASE_URL}/register/${registrationId}`, { withCredentials: true });
      console.log(checkRes , "check res")
      const registrationData = checkRes.data.data;

      if (registrationData?.isActive == true) {
        console.log("Received Data:", {
    membershipId: registrationData.membershipId,
    validFrom: registrationData.validFrom,
    validTo: registrationData.validTo
  });
  // console.log(i)
        setActiveStatus(true)
        return registrationData;
      }
      // Wait before next attempt
      await new Promise((resolve) => setTimeout(resolve, interval));
    } catch (err: any) {
      console.error(err.response?.data?.message || err.message);
    }
  }
  throw new Error("Payment confirmation timed out. Please check your payment.");
};

useEffect(()=> {
  //  console.log(cardElement , "--")
  console.log(stripe ,"==")
},[])

const handleSubmit = async (token: string) => {
  setShowProcessing(true);

  try {
    if (!token) {
      throw new Error("Payment token not generated");
    }


    if (!formData.validity) {
  toast.warn("Please select membership validity");
  return;
}
if (!formData.cardholderName) {
  toast.warn("Cardholder name is required");
  return;
}

const payload = {
  firstName: formData.firstName,
  lastName: formData.lastName,
  email: formData.email,
  phone: formData.phone,
  teudatZehut: formData.teudatZehut,
  aliyahDate: new Date(formData.dateOfAliyah).toISOString(),
  validity: formData.validity,
  cardholderName: formData.cardholderName,
  paymentMethod: formData.paymentMethod,
  stripeToken: token,
};
console.log(payload)

    const res = await axios.post(`${BASE_URL}/register`, payload, { withCredentials: true });

    const registrationId = res?.data?.data?.registration?.id;
    if (!registrationId) throw new Error("Registration ID not returned");

    const registrationData = await pollRegistration(registrationId);

    toast.success("Membership activated and Membership ID sent to your email.");
    setMembershipId(registrationData.membershipId);
    setAvalableDate(registrationData.validFrom);
    setValidDate(registrationData.validTo);
    setShowSuccess(true);

  } catch (err: any) {
      const message = err.response?.data?.message || err.message || "Something went wrong";
  toast.error(message);
  } finally {
    setShowProcessing(false);
  }
};



  const handleSuccessClose = () => {
    setShowSuccess(false);
    setCurrentStep(1);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      teudatZehut: "",
      dateOfAliyah: "",
      cardholderName: "",
      cardNumber: "",
      expireDate: "",
      cvc: "",
      paymentMethod: "stripe",
      validity: "",
    });
  };

  return (
  <div  className="min-h-[50vh] flex flex-col font-abc-light  text-white items-center justify-center p-4">
         <h1 className="text-5xl text-center mb-12 md:text-6xl lg:text-7xl xl:text-8xl font-abc-heavy-3  bold-stroke-3 leading-10 md:leading-12 lg:leading-15 xl:leading-19 tracking-[-2px]  xl:tracking-[-5px] ">BECOME A MEMBER</h1>
      <div className="w-full max-w-5xl bg-[#191919] p-6 rounded-3xl ">
        <div className="mb-8">
          <div className="flex flex-col mb-6">
            <div className="flex justify-between">
                    <h2 className="text-2xl">
                        {currentStep === 1 ? "Basic Information" : "Payment & Billing"}
                    </h2>
                      <p className="text-lg text-gray-500">Step {currentStep} of 2</p>
                </div>
            <div className="flex gap-4 flex-1 border-b pb-4 border-b-gray-700">        
              <div className="relative w-full">           
             
                <div
                  className="h-1 bg-[#F80B58] mt-2 transition-all duration-500 ease-out rounded-full"
                  style={{ width: currentStep >= 1 ? "100%" : "0px" }}
                ></div>
                   <p className="text-base lg:text-lg  my-2">Registrant details</p>
              </div>
              <div className="relative w-full">
                    <div className="relative w-full bg-black">
                      <div
                        className="h-1 mt-2  rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: currentStep >= 2 ? "100%" : "0%",
                          backgroundColor: currentStep >= 2 ? "#F80B58" : "#FFFFFF",
                        }}
                      ></div>
                    </div>
                   <p className={`text-base lg:text-lg  my-2 ${currentStep === 2 ? "text-white" : "text-gray-500"}`}>
                  Pay & register
                </p>
              </div>
            </div>
         
          </div>
        </div>

        {currentStep === 1 ? (
          <StepOne data={formData} onChange={handleStepOneChange} onContinue={handleContinue} />
        ) : (
          <StepTwo data={formData} onChange={handleStepTwoChange} onBack={handleBack} onSubmit={handleSubmit} />
        )}
         <PaymentProcessing open={showProcessing} onClose={handleSuccessClose}/>
        <PaymentSuccess open={showSuccess} mail={formData.email} onClose={handleSuccessClose} activeStatus={activeStatus} membershipId={membershipId} avalableDate={avalableDate} validDate={validDate}/>
      </div>
    </div>
  );
};

export default Register;
