
const FeatureCard = ({ color, children } : {color: string , children: any}) => {
  return (
    <div
    style={{
      backgroundColor: color 
    }}
      className={`rounded-xl p-4 md:p-6    flex items-center justify-center`}
    >
      <p className={`text-center text-base md:text-lg  lg:text-xl xl:text-2xl   italic font-medium ${color === "#000000" ? "text-white" : "text-black"}`}>
        {children}
      </p>
    </div>
  );
};

export default FeatureCard;
