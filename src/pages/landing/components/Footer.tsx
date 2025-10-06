import Logo_black from "../../../assets/images/Logo_black.png"
import Input from "../../../components/ui/Input"
import Button from "../../../components/ui/Button"
import Facebook from "../../../assets/images/Facebook.png"
import Instagram from "../../../assets/images/Instagram.png"
import LinkedIn from "../../../assets/images/LinkedIn.png"
import Twitter from "../../../assets/images/Twitter.png"

// Social Media Icons Component


    

const Footer = () => {
    return (
        <footer className="bg-white border-t border-b border-l border-r border-gray-300">
            {/* Main Footer Content */}
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 max-w-7xl">
                {/* Header Section with Logo and Social Icons */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 lg:mb-12 gap-4 sm:gap-0">
                    <div className="flex items-center">
                        <img src={Logo_black} alt="MAXIWISE" className="h-6 sm:h-7 lg:h-8" />
                    </div>
                    <div className="flex gap-3 sm:gap-4">
                        <img src={Facebook} alt="Facebook" className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 cursor-pointer hover:opacity-80 transition-opacity" />
                        <img src={Instagram} alt="Instagram" className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 cursor-pointer hover:opacity-80 transition-opacity" />
                        <img src={LinkedIn} alt="LinkedIn" className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 cursor-pointer hover:opacity-80 transition-opacity" />
                        <img src={Twitter} alt="Twitter" className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 cursor-pointer hover:opacity-80 transition-opacity" />
                    </div>
                </div>

                {/* Be the first to know section - Always at top */}
                <div className="mb-8 lg:mb-12">
                    <h3 className="font-outfit font-normal text-base sm:text-lg text-black mb-2 leading-tight">
                        Be the first to know
                    </h3>
                    <p className="font-outfit text-sm text-[#4B5563] mb-4 leading-relaxed">
                        We'll send you only what matters — no noise, no spam.
                    </p>
                    <div className="relative flex max-w-md">
                        <input
                            type="email"
                            placeholder="Enter Email Address"
                            className="flex-1 px-4 py-3 pr-32 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-purple-500 placeholder:text-gray-500 font-outfit"
                        />
                        <Button 
                            className="absolute right-1 top-1 bottom-1 bg-purple hover:bg-purple/90 text-white px-6 rounded-full font-medium text-sm whitespace-nowrap border-0"
                        >
                            Subscribe
                        </Button>
                    </div>
                </div>

                {/* Navigation sections - 2 column layout as per image */}
                <div className="space-y-6 sm:space-y-8">
                    {/* Top row: Navigation and Account side by side */}
                    <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                        {/* Navigation section */}
                        <div>
                            <h3 className="font-outfit font-normal text-sm text-navy mb-3 sm:mb-4 leading-tight">
                                Navigation
                            </h3>
                            <ul className="space-y-2 sm:space-y-3">
                                <li>
                                    <a href="/" className="font-outfit font-normal text-sm text-[#4B5563] hover:text-gray-900 transition-colors">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="/about" className="font-outfit font-normal text-sm text-[#4B5563] hover:text-gray-900 transition-colors">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="/search-funds" className="font-outfit font-normal text-sm text-[#4B5563] hover:text-gray-900 transition-colors">
                                        Search Funds
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Account section */}
                        <div>
                            <h3 className="font-outfit font-normal text-sm text-navy mb-3 sm:mb-4 leading-tight">
                                Account
                            </h3>
                            <ul className="space-y-2 sm:space-y-3">
                                <li>
                                    <a href="/signup" className="font-outfit font-normal text-sm text-[#4B5563] hover:text-gray-900 transition-colors">
                                        Create Account
                                    </a>
                                </li>
                                <li>
                                    <a href="/login" className="font-outfit font-normal text-sm text-[#4B5563] hover:text-gray-900 transition-colors">
                                        Log In
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom row: Contact us section */}
                    <div>
                        <h3 className="font-outfit font-normal text-sm text-navy mb-3 sm:mb-4 leading-tight">
                            Contact us
                        </h3>
                        <div className="space-y-2 sm:space-y-3">
                            <p className="font-outfit font-normal text-sm text-[#4B5563] leading-relaxed">
                                <span className="block">info@maxiwise.com</span>
                            </p>
                            <p className="font-outfit font-normal text-sm text-[#4B5563] leading-relaxed">
                                <span className="block">+91 (813) 095-8849</span>
                            </p>
                            <p className="font-outfit font-normal text-sm text-[#4B5563] leading-relaxed">
                                <span className="block">Bengaluru, Karnataka, India</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-300">
                <div className="mx-auto pt-6 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl">
                    <div className="flex flex-col gap-4">
                        <p className="font-outfit font-normal text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                            © 2025 Maxiwise. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a href="/privacy-policy" className="font-outfit font-normal text-xs sm:text-sm text-[#4B5563] hover:text-gray-900 transition-colors">
                                Privacy Policy
                            </a>
                            <a href="/terms-of-service" className="font-outfit font-normal text-xs sm:text-sm text-[#4B5563] hover:text-gray-900 transition-colors">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer