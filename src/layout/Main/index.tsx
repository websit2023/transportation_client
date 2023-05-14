import { useLocation } from "react-router-dom";
import Header from "../Header";
import BannerLayout from "../Banner";
import Footer from "../Footer";

function MainLayOut({ children }: any) {
    const location = useLocation()
    return (  
        <>
            <Header />
            <BannerLayout pageName={location.pathname.slice(1, location.pathname.length)}/>
            {children}
            <Footer />
        </>
    );
}

export default MainLayOut;