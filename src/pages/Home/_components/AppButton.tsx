import React, { useState } from "react";

interface AppButtonProps {
  color: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const AppButton: React.FC<AppButtonProps> = ({ color, children, onClick }) => {
  const [bgColor, setBgColor] = useState(color);

  const handleMouseEnter = () => setBgColor(color + "70"); 
  const handleMouseLeave = () => setBgColor(color);

  return (
    <button
      style={{ backgroundColor: bgColor }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="px-8 py-2 w-46 cursor-pointer text-white font-abc-light rounded-3xl transition text-base md:text-lg lg:text-xl xl:text-2xl"
    >
      {children}
    </button>
  );
};

export default AppButton;
