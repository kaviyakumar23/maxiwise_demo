import { useEffect } from "react"
import Header from "../../components/common/Header"
import LatestNews from "./LatestNews"
import Join_Now from "./Join_Now"
import Footer from "../landing/components/Footer"

export const BlogMain = () => {
    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header fixedStyle="light" />
            <LatestNews />
            <Join_Now />
            <Footer />
        </>
    )
}