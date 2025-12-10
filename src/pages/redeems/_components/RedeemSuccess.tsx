import { Dialog, DialogContent } from '@radix-ui/react-dialog'
import successPic from "@/assets/payment/dialog/redeemSucees.png";
import { HiX } from 'react-icons/hi';

type RedeemSuccessProps = {
  open: boolean;
  onClose: () => void;
}

const RedeemSuccess: React.FC<RedeemSuccessProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        
      <DialogContent aria-describedby="dialog-description"
        className="border-0 bg-white rounded-2xl shadow-2xl max-w-sm p-0
                   fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div>
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer">
                <HiX />
            </button>
        </div>
        <div className="space-y-6 py-8 px-6 text-center text-black">
          <div className="flex justify-center">
            <img src={successPic} alt="success" className="w-20 h-20" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl lg:text-3xl font-bold">Discount Approved!</h2>
            <p className="text-sm lg:text-base text-gray-600">
              Membership ID: <span className="font-semibold">10642</span>
            </p>
            <p className="text-sm lg:text-base text-gray-600">
              You have 2 uses remain at <span className="font-semibold">Golf Caesarea!</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="bg-[#F80B58] w-full py-2 rounded-full text-white font-semibold
                       hover:bg-[#F80B58CC] transition cursor-pointer"
          >
            Redeem More
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default RedeemSuccess;
