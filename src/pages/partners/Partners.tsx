import type React from "react";
import Categories from "./_components/Categories";
import AppButton from "../Home/_components/AppButton";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import useGetCategories, { type Category as ApiCategory } from "@/hooks/useGetCategories";
import { toast } from "react-toastify";
// import Loading from "@/components/common/Loading";
import CategoriesSkeleton from "./_components/CategoriesSkeleton";

interface UIPartnerCategory {
  name: string;
  color: string;
  businesses: string[];
}

const Partners: React.FC = () => {
  const navigate = useNavigate();
  const { categories, loading, error, refetch } = useGetCategories();

  useEffect(() => {
    document.title = "Partners | OLIM PASS";
    refetch();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const partnerCategories: UIPartnerCategory[] = categories.map((cat: ApiCategory, index: number) => {
    const colors = ["#F80B58", "#CB4F1C", "#37CEDA", "#94C912", "#DB2524"];
    return {
      name: cat.name,
      color: colors[index % colors.length],
      businesses: cat.partners.map(
          (partner) =>
            `${partner?.name} - ${partner?.discount} - Available ${partner?.maxRedeems} times`
        ),
    };
  });

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl text-center mb-12 md:text-6xl lg:text-7xl xl:text-8xl font-abc-heavy-3 bold-stroke-3 leading-9 md:leading-12 lg:leading-15 xl:leading-19 tracking-[-2px] xl:tracking-[-4px]">
          PARTNERS
        </h1>

        {loading ? <CategoriesSkeleton /> : categories.length === 0 ? <div className="text-center text-gray-400 py-10">Sorry, No Partners Available!</div> : <Categories partnerCategories={partnerCategories} />}

        <div className="flex justify-center mt-16">
          <AppButton onClick={() => navigate("/register")} color="#F80B58">
            SIGN UP
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default Partners;
