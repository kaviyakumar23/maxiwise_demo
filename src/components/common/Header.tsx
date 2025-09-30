import Search from "./Search"
import GetStarted from "./GetStarted"
import Logo from "../../assets/images/Logo.png"
const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 grid grid-cols-3 items-center px-8 py-4">
    <div className="p-2 flex flex-row gap-4 text-white cursor-pointer" >
      <div>About</div>
      <div>Features</div>
      <div>Blog</div>
      <div>Contact</div>
    </div>
    <div className="flex justify-center">
    <div>
      <img src={Logo} alt="Logo" className="w-50 h-15" />
    </div>
    </div>
    <div className="flex flex-row gap-4 justify-end" >
    <div><Search /></div>
    <div><GetStarted /></div>
    </div>
    </div>
  )
}

export default Header