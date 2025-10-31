import AboutImg from "../../assets/images/AboutImg.png";
import AboutImgMobile from "../../assets/images/AboutImgMobile.png";
// import BarChart from "../../assets/images/BarChart.png";
import { useLoginModal } from "../getStarted/LoginModal";

const About = () => {
    const { openModal } = useLoginModal();
    return (
        <div className="w-full overflow-hidden">
            {/* Hero Image Section */}
            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-24 md:pt-28">
                {/* Mobile Image - shown only on small screens */}
                <img
                    src={AboutImgMobile}
                    alt="About"
                    className="block sm:hidden w-full h-auto object-cover rounded-2xl"
                />
                {/* Desktop Image - shown on sm and larger screens */}
                <img
                    src={AboutImg}
                    alt="About"
                    className="hidden sm:block w-full h-auto object-cover rounded-2xl sm:rounded-3xl"
                />
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12">
                <div className="flex flex-col items-center text-center">

                    {/* About us Badge */}
                    <div className="inline-flex items-center justify-center px-5 sm:px-6 py-2 m-6 mt-10 rounded-full bg-[#E8D8FF] text-navy">
                        <span className="text-sm sm:text-xl font-medium font-outfit text-navy text-center">About us</span>
                    </div>


                    {/* Main Heading */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-navy mb-8 sm:mb-10 md:mb-12 font-outfit leading-tight px-4 text-center">
                        The noise ends here.
                    </h1>

                    {/* Content Paragraphs */}
                    <div className="space-y-4 sm:space-y-5 md:space-y-6 text-base sm:text-lg md:text-xl lg:text-2xl font-outfit text-[#4B5563] font-normal leading-[150%] px-4 text-left">
                        <p>
                            When we look at India's mutual fund industry today, over ₹75.6 lakh crore strong, we can't help but think back to when it was barely ₹1 lakh crore.
                        </p>

                        <p>
                            We've been part of this journey since those early, uncertain years — when financial awareness was low, access was limited, and information was scarce.
                        </p>

                        <p>
                            Over the past two and a half decades, we've seen the market through every major cycle. We've seen portfolios rise, fall, and rebuild. And through those phases, we refined frameworks that helped us stay rational when the world wasn't.
                        </p>

                        <p>
                            For years, those frameworks — our CARRVA analysis model and Alpha methodology — shaped the investment decisions of family offices and ultra-wealthy investors, guiding them through risk, consistency, and opportunity.
                        </p>
                    </div>

                    {/* Large Question Section */}
                    <div className="py-12 sm:py-7 md:py-8 px-4 w-full">
                        <p className="text-2xl sm:text-3xl md:text-4xl font-normal font-outfit text-navy leading-snug md:leading-snug text-left mb-4">
                            But somewhere along the way, a question began to echo louder:
                        </p>
                        <p className="text-2xl sm:text-3xl md:text-4xl font-normal font-outfit text-navy leading-snug md:leading-snug text-left">
                            Why should clarity in investing be a privilege reserved for a few?
                        </p>
                    </div>

                    {/* More Content Paragraphs */}
                    <div className="space-y-4 sm:space-y-5 md:space-y-6 text-base sm:text-lg md:text-xl lg:text-2xl font-outfit text-[#4B5563] font-normal leading-[150%] px-4 text-left">
                        <p>
                            Because today, the problem isn't access.
                        </p>
                        <p>
                            Every investor has access — to 1,400 mutual funds, to dozens of platforms, to an overload of ratings and reviews. Yet most still struggle to decide.
                        </p>

                        <p>
                            The problem isn't information scarcity anymore, it's information overload.
                        </p>
                        <p>
                            Too much information – often contradictory, too little insight. Too many opinions, too little perspective.
                        </p>

                        <p>
                            With a simple belief that clarity should be democratized, we built Maxiwise as India's decision layer for investing — to make the same professional-grade frameworks that power institutional portfolios accessible to every investor.
                        </p>

                        <p>
                            So that anyone, anywhere, can make sense of their options — see how funds truly perform, not just how they're presented.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full px-4 py-8 justify-start self-start mx-auto">
                        <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-navy text-white font-outfit text-sm sm:text-base md:text-lg hover:bg-opacity-90 transition-all whitespace-nowrap">
                            Watch how CARRVA works
                        </button>
                        <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-navy text-white font-outfit text-sm sm:text-base md:text-lg hover:bg-opacity-90 transition-all whitespace-nowrap">
                            Understand the Alpha methodology
                        </button>
                    </div>

                    {/* Final Paragraphs */}
                    <div className="w-full space-y-4 sm:space-y-5 md:space-y-6 text-base sm:text-lg md:text-xl lg:text-2xl font-outfit text-[#4B5563] font-normal leading-[150%] px-4 text-left">
                        <p>
                            Because while the size of wealth may differ, the principles of wise investing don't.
                        </p>

                        <p>
                            The same discipline that helps a family office preserve legacy can help an individual investor build theirs.
                        </p>
                    </div>

                    {/* Sign Up Button */}
                    <div className="mt-10 sm:mt-12 px-4 mx-auto w-full flex justify-start">
                        <button
                            onClick={openModal}
                            className="w-full sm:w-auto px-8 sm:px-10 py-2 rounded-full bg-navy text-white font-outfit text-sm sm:text-base md:text-lg hover:bg-opacity-90 transition-all cursor-pointer"
                        >
                            Sign up for early access
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default About;