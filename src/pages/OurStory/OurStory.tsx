import Header from "../../components/common/Header";
import Footer from "../landing/components/Footer";
import Start_Now from "../landing/components/Start_Now";
import About from "./About";

const OurStory = () => {
    return (
        <div>
            <Header fixedStyle="light" noShadow />
            <About />
            <Start_Now />
            <Footer />
        </div>
    )
}

export default OurStory;