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
        <footer className="bg-white border-t border-b border-l border-r border-gray-300 px-4">
            {/* Main Footer Content */}
            <div className="mx-auto px-4 py-12">
                {/* Header Section with Logo and Social Icons */}
                <div className="flex justify-between items-start mb-12">
                    <div className="flex items-center">
                        <img src={Logo_black} alt="MAXIWISE" className="h-8" />
                    </div>
                    <div className="flex gap-4">
                        <img src={Facebook} alt="Facebook" className="w-8 h-8" />
                        <img src={Instagram} alt="Instagram" className="w-8 h-8" />
                        <img src={LinkedIn} alt="LinkedIn" className="w-8 h-8" />
                        <img src={Twitter} alt="Twitter" className="w-8 h-8" />
                    </div>
                </div>

                {/* Main Content Grid - 2 columns layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left side - Be the first to know section */}
                    <div>
                        <h3 className="font-outfit font-normal text-lg text-black mb-2 leading-[29.95px]">
                            Be the first to know
                        </h3>
                        <p className="font-outfit text-sm text-[#4B5563] mb-2 leading-[20.74px]">
                            We'll send you only what matters — no noise, no spam.
                        </p>
                        <div className="flex gap-2 max-w-md">
                            <Input
                                placeholder="Enter Email Address"
                                className="flex-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                            />
                            <Button 
                                className="bg-purple hover text-white px-6 py-2 rounded-md font-medium"
                            >
                                Subscribe
                            </Button>
                        </div>
                    </div>

                    {/* Right side - Grouped sections */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Navigation section */}
                        <div>
                            <h3 className="font-outfit font-normal text-sm text-navy mb-4 leading-[20.74px]">
                                Navigation
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="font-outfit font-normal text-sm text-[#4B5563] hover:text-gray-900 transition-colors">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="font-outfit font-normal text-sm text-[#4B5563] hover:text-gray-900 transition-colors">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="font-outfit font-normal text-sm text-[#4B5563] hover:text-gray-900 transition-colors">
                                        Search Funds
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Account section */}
                        <div>
                            <h3 className="font-outfit font-normal text-sm text-navy mb-4 leading-[20.74px]">
                                Account
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="font-outfit font-normal text-sm text-[#4B5563] hover:text-gray-900 transition-colors">
                                        Create Account
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="font-outfit font-normal text-sm text-[#4B5563] hover:text-gray-900 transition-colors">
                                        Log In
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact us section */}
                        <div>
                            <h3 className="font-outfit font-normal text-sm text-navy mb-4 leading-[20.74px]">
                                Contact us
                            </h3>
                            <div className="space-y-3">
                                <p className="font-outfit font-normal text-sm text-[#4B5563] leading-[20.74px]">
                                    <span className="block">info@maxiwise.com</span>
                                </p>
                                <p className="font-outfit font-normal text-sm text-[#4B5563] leading-[20.74px]">
                                    <span className="block">+91 (813) 095-8849</span>
                                </p>
                                <p className="font-outfit font-normal text-sm text-[#4B5563] leading-[20.74px]">
                                    <span className="block">Bengaluru, Karnataka, India</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-300">
                <div className="mx-auto px-4 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <p className="font-outfit font-normal text-sm text-[#4B5563] leading-[20.74px]">
                            © 2025 Maxiwise. All rights reserved.
                        </p>
                        <div className="flex gap-6 mt-4 sm:mt-0">
                            <a href="#" className="font-outfit font-normal text-sm text-[#4B5563] hover:text-gray-900 transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="font-outfit font-normal text-sm text-[#4B5563] hover:text-gray-900 transition-colors">
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