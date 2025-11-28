
const FeatureCard = ({ color, children } : {color: string , children: any}) => {
  return (
    <div
    style={{
      backgroundColor: color 
    }}
      className={`rounded-xl  flex  items-center justify-center`}
    >
      <p className={`text-center text-base md:text-lg  font-abc-light lg:text-xl xl:text-2xl   italic font-medium ${color === "#000000" ? "text-white" : "text-black"}`}>
        {children}
      </p>
    </div>
  );
};

export default FeatureCard;
