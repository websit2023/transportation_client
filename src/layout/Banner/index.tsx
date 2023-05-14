import { FunctionComponent } from "react";
import "./styles.css"
import { Link } from "react-router-dom";

interface BannerLayoutProps {
    pageName: string
}

const BannerLayout: FunctionComponent<BannerLayoutProps> = ({ pageName }) => {
    return (
        <section className="about-banner relative" style={{ backgroundImage: 'url(../img/banner.jpg)' }}>
            <div className="container">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="about-content col-lg-12">
                        <h1 className="text-white">
                            {pageName}
                        </h1>
                        <p className="text-white link-nav">
                            <Link to={"/"}> Home </Link>
                            <span className="lnr lnr-arrow-right" />
                            <a href="#"> {pageName} </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BannerLayout;