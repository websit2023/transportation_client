import { FormEvent, FunctionComponent, useState } from "react";
import "./styles.css"
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../services/auth.service";
import { useAuth } from "../../contexts/auth.context";
import { message } from 'antd';

interface SignInFormProps {

}

const SignInForm: FunctionComponent<SignInFormProps> = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { addTokens } = useAuth()
    const navigate = useNavigate()

    const handleSubmit =async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = await signIn(email, password)
        if(!data) {
            message.error("Email or password is not correct !")
            return;
        }

		message.success("Login success!")
        addTokens(data)
        navigate("/")
    }

    return (
        <>
            <div className="auth-main">
                <section className="signin">
                    <div className="container">
                        <div className="wrapper">
                            <div className="signin-content d-flex">
                                <div className="signin-image">
                                    <figure><img src="/img/auth/signin-image.jpg" alt="sing up" /></figure>
                                    <Link to={"/sign-up"} className="signup-image-link">Create an account</Link>
                                </div>
                                <div className="signin-form">
                                    <h2 className="form-title">Sign in</h2>
                                    <form onSubmit={handleSubmit} className="register-form" id="login-form">
                                        <div className="form-group">
                                            <label htmlFor="email"><i className="zmdi zmdi-account material-icons-name" /></label>
                                            <input 
                                                type="email" 
                                                name="email" 
                                                id="email" 
                                                placeholder="Your email" 
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="your_pass"><i className="zmdi zmdi-lock" /></label>
                                            <input 
                                                type="password" 
                                                name="your_pass" 
                                                id="your_pass" 
                                                placeholder="Password" 
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group form-button">
                                            <input type="submit" name="signin" id="signin" className="form-submit" defaultValue="Log in" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default SignInForm;