import Header from "../../components/common/Header"
import LatestNews from "./LatestNews"
import Join_Now from "./Join_Now"
import Footer from "../landing/components/Footer"

export const BlogMain = () => {
    return (
        <>
            <Header fixedStyle="light" />
            <LatestNews />
            <Join_Now />
            <Footer />
        </>
    )
}