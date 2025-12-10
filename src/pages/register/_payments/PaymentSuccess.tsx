import type React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { GoDownload } from "react-icons/go";
import successPic from "@/assets/payment/dialog/success.png"
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
// import { useNavigate } from "react-router";


interface PaymentSuccessProps {
  open: boolean
  onClose: () => void
  membershipId: string
  avalableDate: string ,
  validDate : string
  activeStatus: boolean
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ open, onClose, membershipId , validDate , avalableDate , activeStatus}) => {
  // const navigate = useNavigate()
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent aria-describedby="dialog-description" className="border-0 bg-white rounded-2xl shadow-2xl max-w-md italic">

          <DialogTitle className="sr-only">Payment Successful</DialogTitle>
  <DialogDescription id="dialog-description" className="sr-only">
    Your membership has been activated. Your membership ID has been sent to your email.
  </DialogDescription>

        <div className="space-y-2  px-6 text-center">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest">Confirmation</p>
          {/* Medal/Checkmark Icon */}
          <div className="flex justify-center">
            <img src={successPic} alt="" className="w-20 h-20 object-cover"/>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-black">Congratulations!</h2>
            <p className="text-base text-gray-600">
             You have been successfully registered in our system. We have sent a copy of your membership ID and payment details to your email ex……@.com
            </p>
          </div>

          {/* Membership Details */}
          <div className=" rounded-lg p-4 space-y-3">
            <div>
              <p className="text-2xl mb-2">Your Active Membership ID is:</p>
              <div className="text-lg font-bold text-black tracking-widest flex justify-center mb-6 gap-1 ">
               {membershipId?.split("").map((char, index) => (
                    <span
                        key={index}
                        className="w-10 h-10 flex items-center justify-center rounded-sm  bg-gray-100 p-4 mx-0.5"
                    >
                        {char}
                    </span>
                ))}

                </div>
            </div>

            <div className=" gap-4  border-t border-gray-200 text-[#191919]">
              <div className=" flex justify-between border-b border-gray-200 p-3">
                <p className="  ">Membership Status:</p>
                <p className=" ">{activeStatus ? "Activated" : "Not Activate"}</p>
              </div>
              <div className="flex justify-between border-b border-gray-200 p-3">
                <p className=" ">Activation Date:</p>
                <p className=" ">{ avalableDate.slice(0,10)}</p>
              </div>
                <div className="flex justify-between border-b border-gray-200 p-3">
                    <p className=" ">Valid Still:</p>
                    <p className="">{validDate.slice(0,10)}</p>
                 </div>
            </div>

          
          </div>

          {/* Buttons */}
          <div className="space-y-3 pt-4">
            <Button className="w-full bg-[#e1e1e1] text-black hover:bg-gray-200 cursor-pointer rounded-full font-semibold">
              Download as PDF <GoDownload size={22}/>
            </Button>
            {/* <Button onClick={()=> navigate("/redeem")} className="w-full bg-[#F80B58] text-white hover:bg-pink-500 cursor-pointer rounded-full font-semibold">
              Redeem First Discount
            </Button> */}
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentSuccess
