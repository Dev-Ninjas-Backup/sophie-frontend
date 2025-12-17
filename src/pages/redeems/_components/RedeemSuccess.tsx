import { Dialog, DialogContent } from '@radix-ui/react-dialog'
import successPic from "@/assets/payment/dialog/redeemSucees.png";
import { HiX } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { GoDownload } from 'react-icons/go';
import { useEffect, useState } from 'react';

type RedeemData = {
  id: string;
  remainRedeems: number;
  registration: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    teudatZehut: string;
    aliyahDate: string;
    membershipId: string;
  };
  partner: {
    name: string;
    discount: string;
    category: { name: string };
  };
  redeemedAt: string;
};

type RedeemSuccessProps = {
  open: boolean;
  onClose: () => void;
  redeemedId: string | null;
};

const RedeemSuccess: React.FC<RedeemSuccessProps> = ({ open, onClose, redeemedId }) => {
  const [redeemData, setRedeemData] = useState<RedeemData | null>(null);

  useEffect(() => {
    if (redeemedId) {
      const stored = JSON.parse(localStorage.getItem("redeemData") || "null");
      if (stored && stored.id === redeemedId) {
        setRedeemData(stored);
      }
    }
  }, [redeemedId]);

const handleDownloadPDF = () => {
  if (!redeemData) return;

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  import("jspdf").then((jsPDFModule) => {
    const { jsPDF } = jsPDFModule;
    const doc = new jsPDF();

    const primaryColor = "#F80B58"; // Pinkish
    const secondaryColor = "#333333"; // Dark gray text
    const boxColor = "#f8f8f8"; // Light gray boxes

    // Title
    doc.setFillColor(primaryColor);
    doc.rect(0, 0, 210, 30, "F");
    doc.setTextColor("#ffffff");
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("OLIM PASS MEMBERSHIP", 105, 20, { align: "center" });

    // Divider
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(0.8);
    doc.line(20, 35, 190, 35);

    let startY = 45;
    const lineHeight = 10;

    // ===== Partner Section =====
    doc.setFillColor(boxColor);
    doc.roundedRect(15, startY, 180, 60, 5, 5, "F");
    doc.setTextColor(secondaryColor);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`Partner: ${redeemData.partner.name}`, 20, startY + 15);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Discount: ${redeemData.partner.discount}`, 20, startY + 25);
    const redeemedAt = new Date(redeemData.redeemedAt);
    doc.text(`Redeemed At: ${redeemedAt.toLocaleString("en-US", options)}`, 20, startY + 35);
doc.text(`Note: This PDF can be used only once.`, 20, startY + 45);
startY += 85; // Move below partner box including the new line

    // ===== Member Section =====
    doc.setFillColor(boxColor);
    doc.roundedRect(15, startY, 180, 90, 5, 5, "F");
    doc.setTextColor(secondaryColor);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Member Information", 105, startY + 10, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    let memberY = startY + 25;
    doc.text(`Membership ID: ${redeemData.registration.membershipId}`, 20, memberY);
    memberY += lineHeight;
    doc.text(`Name: ${redeemData.registration.firstName} ${redeemData.registration.lastName}`, 20, memberY);
    memberY += lineHeight;
    doc.text(`Email: ${redeemData.registration.email}`, 20, memberY);
    memberY += lineHeight;
    doc.text(`Phone: ${redeemData.registration.phone}`, 20, memberY);
    memberY += lineHeight;
    doc.text(`Teudat Zehut: ${redeemData.registration.teudatZehut}`, 20, memberY);
    memberY += lineHeight;
    const aliyahDate = new Date(redeemData.registration.aliyahDate);
    doc.text(`Aliyah Date: ${aliyahDate.toLocaleString("en-US", {
                year: 'numeric', month: 'long', day: 'numeric'
              })}`, 20, memberY);

    // Footer
    doc.setTextColor("#777777");
    doc.setFontSize(10);
    doc.text("Thank you for using OLIM PASS!", 105, 280, { align: "center" });

    // Save PDF
    doc.save(`Redeem_${redeemData.registration.membershipId}_${redeemData.partner.name}.pdf`);
  });
};


  if (!redeemData) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
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
              Membership ID: <span className="font-semibold">{redeemData?.registration?.membershipId}</span>
            </p>
            <p className="text-sm lg:text-base text-gray-600">
              You have redeem at <span className="font-semibold">{redeemData?.partner?.name } - {redeemData?.partner?.discount}</span>
            </p>
          </div>

          <div className='flex flex-col gap-2'>
            <button
            onClick={onClose}
            className="bg-[#F80B58] w-full py-2 rounded-full text-white font-semibold
                       hover:bg-[#F80B58CC] transition cursor-pointer"
          >
            Redeem More
          </button>
          <Button
            onClick={handleDownloadPDF}
            className="w-full bg-[#e1e1e1] text-black hover:bg-gray-200 cursor-pointer rounded-full font-semibold flex items-center justify-center gap-2"
          >
            Download as PDF <GoDownload size={22} />
          </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RedeemSuccess;
