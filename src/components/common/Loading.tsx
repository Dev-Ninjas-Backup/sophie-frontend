import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center min-h-[200px]">
      <div className="w-16 h-16 border-4 border-t-pink-500 border-b-pink-500 border-l-gray-600 border-r-gray-600 rounded-full animate-spin"></div>
      <p className="text-xl text-[#F80B58] font-medium">Please Wait!!!</p>
    </div>
  );
};

export default Loading;
