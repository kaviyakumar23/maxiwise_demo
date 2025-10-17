import FundCards from "../../../components/common/FundCards";

const FundPerforming = () => {

  return (
    <div>
      <div>
        <p className="lg:text-2xl md:text-xl text-sm font-outfit font-light text-center text-purple leading-[145%] p-6 mt-6">How is this fund performing?</p>
      </div>
      <div className="font-outfit font-medium text-2xl sm:text-4xl md:text-4xl lg:text-[42px] lg:font-semibold text-navy text-center mb-6 sm:mb-8">
        <h1 className="mb-2">Informed decisions begin</h1>
        <h1>with the right information</h1>
      </div>
      <div>
        <p className="text-sm sm:text-base lg:text-2xl font-light text-center text-navy leading-[145%] p-6">Less personal opinions, more hard facts</p>
      </div>

      {/* Fund Cards Section */}
      <div className="mt-8 mb-12">
        <FundCards enableEnlargementEffect={false} />
      </div>
    </div>
  );
};

export default FundPerforming;