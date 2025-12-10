import type React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import dimond1 from "@/assets/payment/dialog/dimond1.png"
import dimond2 from "@/assets/payment/dialog/dimond2.png"
import dimond3 from "@/assets/payment/dialog/dimond3.png"
import { useEffect, useState } from "react"
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"

interface PaymentProcessingProps {
  open: boolean ;
  onClose: () => void;
}

const PaymentProcessing: React.FC<PaymentProcessingProps> = ({ open , onClose }) => {
  const [image , setImage] = useState(dimond1)

  useEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      setImage(prev =>
        prev === dimond1 ? dimond2 : prev === dimond2 ? dimond3 : dimond1
      );
    }, 300);

    return () => clearInterval(interval);
  }, [open]);

  return (
  <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>

      <DialogContent aria-describedby="dialog-description" className="border-0 bg-white rounded-2xl shadow-2xl max-w-md italic">

          <DialogTitle className="sr-only">Payment Processing</DialogTitle>
  <DialogDescription id="dialog-description" className="sr-only">
    Payment is currently being processed. Please wait for your membership ID.
  </DialogDescription>


        <div className="space-y-3 p-6 text-center">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest">Processing</p>

          <div className="flex justify-center">
            <img src={image} alt="Processing" className="w-24 h-24" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-black">Registration in Progress...</h2>
            <p className="text-base text-gray-600">
              Please wait until the payment proceed successfully and prepare your unique member ID
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentProcessing
