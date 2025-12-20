import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RedeemSuccess from "./_components/RedeemSuccess";
import useGetCategories, { type Category, type Partner } from "@/hooks/useGetCategories";
// import useSingleGetCategory from "@/hooks/useSingleGetCategory";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "@/lib/baseUrl";

export default function RedeemPage() {

  const [sendingOtp, setSendingOtp] = useState(false);
const [redeeming, setRedeeming] = useState(false);

  const [open, setOpen] = useState(false);
  const [membershipId, setMembershipId] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<Partner | null>(null);

  const { categories, loading: categoriesLoading, error: categoriesError } = useGetCategories();
  // const { category: selectedCategory, loading: categoryLoading, error: categoryError } = useSingleGetCategory(selectedCategoryId);
  const selectedCategory = categories.find(
  (cat) => cat.id === selectedCategoryId
) || null;


  const [redeemedId , setRedeemedId]= useState<string | null>(null); 

  useEffect(() => {
    document.title = "Redeem | OLIM PASS";
  }, []);

  useEffect(() => {
    if (categoriesError) toast.error(categoriesError);
    // if (categoryError) toast.error(categoryError);
  }, [categoriesError]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedBusiness(null);
  };

  const handleBusinessChange = (businessId: string) => {
    if (!selectedCategory) return;
    const partner = (selectedCategory as Category).partners.find((p: Partner) => p.id === businessId) || null;
    setSelectedBusiness(partner);
  };

const handleSendOtp = async () => {
  if (!membershipId) return toast.error("Enter Membership ID first");
  setSendingOtp(true);
  try {
    const res = await axios.post(`${BASE_URL}/redeem/send-otp`, { membershipId });
    if (res.data.success) {
      toast.success(res.data.message);
      setOtpSent(true);
    }
  } catch (err: any) {
    toast.error(err.response?.data?.message || err.message);
  } finally {
    setSendingOtp(false);
  }
};


const handleRedeem = async () => {
  if (!membershipId || !otp || !selectedBusiness) return;
  setRedeeming(true);
  try {
    const res = await axios.post(`${BASE_URL}/redeem`, {
      membershipId,
      partnerId: selectedBusiness.id,
      otp,
    });
    if (res.data.success) {
      toast.success(res.data.message);
      localStorage.setItem("redeemData", JSON.stringify(res.data.redeem));
 
      setRedeemedId(res.data.redeem.id);
      setOpen(true);
      setOtpSent(false);
      setOtp("");
      setSelectedBusiness(null);
      setSelectedCategoryId(null);
    }
  } catch (err: any) {
    toast.error(err.response?.data?.message || err.message);
  } finally {
    setRedeeming(false);
  }
};



  return (
    <div className=" text-white flex flex-col items-center p-6">
      <h1 className="text-5xl text-center mb-12 md:text-6xl lg:text-7xl xl:text-8xl font-abc-heavy-3 bold-stroke-3 leading-10 md:leading-12 lg:leading-15 xl:leading-19 tracking-[-1px] xl:tracking-[-2px]">
        MEMBERSHIP VALIDATION
      </h1>
      <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 mt-3 text-center max-w-4xl">
        Validate ID, browse partners and redeem ongoing discounts at gyms, coffee shops,
        restaurants, and local businesses for your first 3 years in Tel Aviv.
      </p>

      <div className="bg-[#191919] mt-8 p-6 rounded-xl w-full max-w-4xl space-y-6 shadow-lg">
        {/* Membership ID */}
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <Label className="text-sm lg:text-base font-semibold mb-2 block">Enter your Membership ID:</Label>
            <Input
              value={membershipId}
              onChange={(e) => setMembershipId(e.target.value)}
              placeholder="Enter your 6 digit id"
              className="!bg-[#2b2b2b] border-0 focus:!ring-1 focus:!ring-[#F80B58] text-white placeholder-gray-600"
            />
          </div>
             <button
                onClick={handleSendOtp}
                className="bg-[#F80B58] py-1.5 px-4 rounded-md cursor-pointer font-semibold hover:bg-[#F80B58CC] transition disabled:cursor-not-allowed"
                disabled={sendingOtp}
              >
                {sendingOtp ? "Sending..." : "Send OTP"}
            </button>
        </div>

        {/* OTP Input */}
        {otpSent && (
          <div>
            <Label className="text-sm lg:text-base font-semibold mb-2 block">Enter OTP:</Label>
            <Input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="!bg-[#2b2b2b] border-0 focus:!ring-1 focus:!ring-[#F80B58] text-white placeholder-gray-600"
            />
          </div>
        )}

        {/* Category & Business */}
        {otpSent && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm lg:text-base font-semibold mb-2 block">Select Category:</Label>
              <div className="bg-[#1E1E1E] rounded-lg p-0.5">
                <select
                  value={selectedCategoryId || ""}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full !bg-[#2B2B2B] border border-transparent rounded-lg px-3 py-2 text-white text-sm focus:ring-1 focus:ring-[#F80B58] focus:outline-none"
                >
                  <option value="" disabled>
                    {categoriesLoading ? "Loading categories..." : "Select a category"}
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label className="text-sm lg:text-base font-semibold mb-2 block">Select Business:</Label>
              <div className="bg-[#1E1E1E] rounded-lg p-0.5">
                <select
                  value={selectedBusiness?.id || ""}
                  onChange={(e) => handleBusinessChange(e.target.value)}
                  className="w-full bg-[#2B2B2B] border border-transparent rounded-lg px-3 py-2 text-white text-sm focus:ring-1 focus:ring-[#F80B58] focus:outline-none"
                  disabled={!selectedCategory}
                >
                  <option value="" disabled>
                        {!selectedCategory ? "Select a category first" : "Select a business"}
                      </option>

                      {selectedCategory?.partners.map((partner) => (
                        <option key={partner.id} value={partner.id}>
                          {partner.name} - {partner.discount}
                        </option>
                      ))}

                </select>
              </div>
            </div>
          </div>
        )}

        {/* Redeem Button */}
        {otpSent && (
          <button
              onClick={handleRedeem}
              className="bg-[#F80B58] py-2 px-7 rounded-full font-semibold hover:bg-[#F80B58CC] transition cursor-pointer disabled:cursor-not-allowed"
              disabled={!selectedCategory || !selectedBusiness || !membershipId || !otp || redeeming}
            >
              {redeeming ? "Redeeming..." : "Redeem Discount"}
          </button>
        )}
      </div>

    <RedeemSuccess open={open} onClose={()=> setOpen(false)} redeemedId={redeemedId}/>
    </div>
  );
}
