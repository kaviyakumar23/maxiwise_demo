const Contents = () => {
  return (
    <div className="w-full bg-[#E8D8FF] rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 flex flex-col md:flex-row gap-6 md:gap-8 items-center">
      {/* Left side - Content */}
      <div className="flex-1 flex flex-col gap-4 md:gap-6 font-outfit w-full">
        {/* Badge and Date */}
        <div className="flex items-center gap-3 md:gap-4 flex-wrap">
          <span className="bg-purple text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full text-sm md:text-base font-medium">
            Resources
          </span>
          <span className="text-black text-sm md:text-base font-normal">
            Feb 5, 2025
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-navy leading-tight lg:leading-[60px] tracking-[-1.4px]">
          Top 5 Mutual Fund Investment Strategies for Beginners
        </h2>

        {/* Description */}
        <p className="text-gray font-normal text-sm md:text-base leading-relaxed md:leading-[27px] tracking-[-0.54px] max-w-md">
          Lorem ipsum dolor sit amet consectetur fusce ut viverra leo felis urna libero risus viverra ullamcorper ut id.
        </p>

        {/* Author section */}
        <div className="flex items-center gap-3 md:gap-4 mt-2 md:mt-4">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-black rounded-full"></div>
          <div className="flex flex-col leading-tight md:leading-[25px] tracking-[-0.54px]">
            <span className="text-gray text-sm md:text-base font-normal">Author</span>
            <span className="text-navy text-base md:text-lg font-normal">John Carter</span>
          </div>
        </div>
      </div>

      {/* Right side - Image placeholder */}
      <div className="flex-1 w-full">
        <div className="w-full aspect-[4/3] bg-white rounded-xl md:rounded-2xl"></div>
      </div>
    </div>
  );
};

export default Contents;

