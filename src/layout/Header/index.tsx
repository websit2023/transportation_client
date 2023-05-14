import { FunctionComponent, useEffect, useState } from "react";
import "./styles.css"
import logo from '../../assets/img/header/logo.png'
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt,faUserPlus  } from '@fortawesome/free-solid-svg-icons';




interface HeaderProps {

}

const Header: FunctionComponent<HeaderProps> = () => {
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50);
        });
    }, []);

    const { accessToken, removeTokens } = useAuth()

    return (
        <header id="header" className={scroll ? "header-scrolled" : ""}>
            <div className="header-top">
                <div className="container">
                    <div className="row align-items-center">

                        <div className="col-lg-6 col-sm-6 col-6 header-top-left">
                        </div>
                        <div className="col-lg-6 col-sm-6 col-6 header-top-right">
                            {accessToken
                                ? (
                                    <ul>
                                        <li><Link to={"/profile"}><FontAwesomeIcon icon={faUser}/>
                                        Profile
                                        </Link></li>
                                        <li><a href="#" onClick={removeTokens}>
                                        <FontAwesomeIcon icon={faUserPlus} />Sign up
                                            </a></li>
                                    </ul>
                                )
                                : (
                                    <ul>
                                        <li><Link to={"/sign-in"}>
                                        <FontAwesomeIcon icon={faSignInAlt} />Sign in
                                            </Link></li>
                                        <li><Link to={"/sign-up"}>
                                        <FontAwesomeIcon icon={faUserPlus} />Sign up
                                            </Link></li>
                                    </ul>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="container main-menu">
                <div className="d-flex align-items-center justify-content-between d-flex">
                    <div className="logo">
                        <Link to="/"><img className="logo" src={logo} alt="logo" /></Link>
                    </div>
                    <nav id="nav-menu-container">
                        <ul className="nav-menu">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/schedule">Schedule</Link></li>
                        </ul>
                    </nav>{/* #nav-menu-container */}
                </div>
            </div>
        </header>
    );
}

export default Header;