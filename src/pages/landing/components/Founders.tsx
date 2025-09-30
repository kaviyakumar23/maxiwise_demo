import Co_founder_1 from "../../../assets/images/Co_founder_1.png"
import Co_founder_2 from "../../../assets/images/Co_founder_2.png"
import Co_founder_3 from "../../../assets/images/Co_founder_3.png"

const Founders = () => {
    return (
        <div>
            <h1 className="font-outfit font-medium text-navy text-center mb-8 pt-30" style={{fontSize: '56px'}}>Built by the <span className="text-purple ">Experts</span></h1>
            <div className="font-outfit font-normal text-lg text-[#4B5563] text-center">
            <p>
                Our team combines decades of financial expertise with a mission:
            </p>
            <p className="mb-8">
                making investing transparent and accessible for everyone.
            </p>
            </div>
            <div className="grid grid-cols-3 gap-2 p-6 ">
                <div className="flex justify-end">
                    <div className="relative w-[270px] h-[360px] rounded-2xl overflow-hidden"
                         style={{ transform: 'rotate(-8deg)' }}>
                        <img src={Co_founder_1} alt="Co-Founder 1" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 rounded-2xl"
                             style={{
                                 background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 58%, #000000 100%)'
                             }}></div>
                        <div className="absolute bottom-4 left-4 text-white">
                            <p className="font-normal font-outfit text-xl text-lime mb-px">Vikas Khaitan</p>
                            <p className="text-sm font-outfit font-light text-white opacity-90">Co-Founder</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative w-[270px] h-[360px] rounded-2xl overflow-hidden"
                         style={{ transform: 'rotate(0deg)' }}>
                        <img src={Co_founder_2} alt="Co-Founder 2" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 rounded-2xl"
                             style={{
                                 background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 58%, #000000 100%)'
                             }}></div>
                        <div className="absolute bottom-4 left-4 text-white">
                            <p className="font-normal font-outfit text-xl text-lime mb-px">Prashant Joshi</p>
                            <p className="text-sm font-outfit font-light text-white opacity-90">Co-Founder</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start">
                <div className="relative w-[270px] h-[360px] rounded-2xl overflow-hidden"
                         style={{ transform: 'rotate(8deg)' }}>
                    <img src={Co_founder_3} alt="Co-Founder 3" className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 rounded-2xl"
                             style={{
                                 background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 58%, #000000 100%)'
                             }}></div>
                    <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-normal font-outfit text-xl text-lime mb-px">Anurag Jhanwar</p>
                        <p className="text-sm font-outfit font-light text-white opacity-90">Co-Founder</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Founders;