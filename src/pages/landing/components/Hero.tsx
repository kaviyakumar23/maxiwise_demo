import GetStarted from "../../../components/common/GetStarted"
import BackgroundHero from "../../../assets/images/BackgroundHero.png"
import Search from "../../../components/common/Search";

export const Hero = () => {

  return (
    <>
      <div id='hero' className="min-h-screen bg-white h-100vh bg-cover bg-center relative font-outfit">
        <img src={BackgroundHero} alt="BackgroundHero" className="absolute inset-0 w-full h-full object-cover" />
        
        {/* Desktop Layout (1025px and above) */}
        <div className="relative z-10 hidden xl:flex flex-col justify-center items-center min-h-screen px-8 tracking-normal">
          {/* Main content - centered in the middle of the page */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-2xl font-normal leading-[35px] font-outfit text-purple mb-8">
              <p>India's Decision Layer for Investing</p>
            </div>
            <div className="mb-12">
              <h1 className="text-6xl font-medium font-outfit text-white py-2">
                The most objective report card <br /> of every mutual fund.
              </h1>
              <p className="text-2xl font-light italic font-outfit text-white p-4">
                No bias, Only facts.
              </p>
            </div>
            <div className='w-full max-w-xl mx-auto'>
              <Search />
              {/* <GetStarted>Start Maxiwising</GetStarted> */}
            </div>
          </div>

          {/* Bottom section - CTA and footer - positioned at bottom */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-6">
            <div className="text-white md:text-sm text-xs font-normal text-center">
              Analysing 1400 funds across 5451 parameters, sifting through 240M data points across market cycle every month
            </div>
          </div>
        </div>

        {/* Tablet Layout (768px - 1024px) */}
        <div className="relative z-10 hidden md:flex xl:hidden flex-col justify-center items-center min-h-screen px-6 tracking-normal">
          {/* Main content - centered in the middle of the page */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-2xl font-normal leading-[35px] font-outfit text-purple mb-8">
              <p>India's Decision Layer for Investing </p>
            </div>
            <div className="mb-12">
              <h1 className="text-5xl lg:text-6xl font-medium leading-tight py-2 font-outfit text-white">
              The most objective <br /> report card of every <br /> mutual fund.
              </h1>
              <p className="text-2xl lg:text-2xl font-light italic leading-tight p-4 font-outfit text-white">
                No bias, Only facts.
              </p>
            </div>
            <div>
              {/* <GetStarted>Start Maxiwising</GetStarted> */}
              <Search />
            </div>
          </div>

          {/* Bottom section - CTA and footer - positioned at bottom */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-6">
            <div className="text-white md:text-sm text-xs font-normal text-center">
            Analysing 1400 funds across 5451 parameters, sifting through 240M data points across market cycle every month
            </div>
          </div>
        </div>

        {/* Mobile Layout (below 768px) */}
        <div className="relative z-10 flex md:hidden flex-col justify-center items-start min-h-screen px-2 tracking-normal">
          {/* Main content - centered vertically, left-aligned horizontally */}
          <div className="flex flex-col items-start justify-center text-left pl-8">
            <div className="text-base font-normal leading-[35px] font-outfit text-purple mb-8">
              <p>India's Decision Layer for Investing</p>
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-medium leading-tight font-outfit text-white">
                The most objective 
              </h1>
              <h1 className="text-4xl sm:text-5xl font-medium leading-tight font-outfit text-white">
                report card of every
              </h1>
              <h1 className="text-4xl sm:text-5xl font-medium leading-tight mb-2 font-outfit text-white">
                mutual fund.
              </h1>
              <p className="text-base lg:text-4xl font-light italic leading-tight p-4 font-outfit text-white">
                No bias, Only facts.
              </p>
            </div>
            <div className='py-6'>
              <GetStarted openSearchOnClick={true}>Start Maxiwising</GetStarted>

            </div>
          </div>

          {/* Bottom section - CTA and footer - positioned at bottom */}
          <div className="absolute bottom-16 left-6 flex flex-col items-start justify-start gap-6 pl-4">
            <div className="text-white md:text-sm text-xs font-normal text-left">
            Analysing 1400 funds across 5451 parameters, sifting through 240M data points across market cycle every month
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;