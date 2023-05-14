import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import "./styles.css"
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../services/auth.service";
import { removeEmpty } from "../../utils/obj";
import { message } from 'antd';

interface SignUpFormProps { }

export enum Roles {
    Customer = 'customer',
    Driver = 'driver',
    Admin = 'admin'
}

interface SignUpForm {
    email: string
    password: string
    retype_password: string
    role: Roles | ""
    driver_profile?: {
        driver_name: string
        phone_number: string
        address?: string
    }
    customer_profile?: {
        customer_name: string
        phone_number: string
        year_of_birth?: number
        address?: string
    }
}

const SignUpForm: FunctionComponent<SignUpFormProps> = () => {
    const [form, setForm] = useState<SignUpForm>({
        email: "",
        password: "",
        retype_password: "",
        role: "",
        driver_profile: undefined,
        customer_profile: undefined
    })

    const navigate = useNavigate()

    const handleAccountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setForm(prevS => ({
            ...prevS,
            [name]: value
        }))
    }

    const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as Roles
        setForm(prevS => ({
            ...prevS,
            role: value,
            driver_profile: value === Roles.Driver
                ? { driver_name: "", phone_number: "", address: "" }
                : undefined,
            customer_profile: value === Roles.Customer
                ? { customer_name: "", phone_number: "", year_of_birth: 2001, address: "" }
                : undefined
        }))
    }

    const handleCustomerInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        const customer_profile = { ...form.customer_profile, [name]: value } as any
        setForm(prev => ({
            ...prev,
            customer_profile
        }))
    }

    const handleDriverInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        const driver_profile = { ...form.driver_profile, [name]: value } as any
        setForm(prev => ({
            ...prev,
            driver_profile
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { retype_password, ...accountData } = form

        // Check password
        if(retype_password.length < 6) {
            message.error("Password must be at least 6 character")
            return;
        }

        if(accountData.password !== retype_password) {
            message.error("Password is not match !")
            return;
        }

        const filteredObj = removeEmpty(form)
        const data = await signUp(filteredObj)
        if(!data) {
            message.error("Register failed. Please try again !")
            return;
        }
        message.success("Register success !")
        navigate("/sign-in")
    }

    return (
        <>
            <div className="auth-main">
                {/* Sign up form */}
                <section className="signup">
                    <div className="container">
                        <div className="wrapper">
                            <div className="signup-content d-flex">
                                <div className="signup-form">
                                    <h2 className="form-title">Sign up</h2>
                                    <form onSubmit={handleSubmit} className="register-form" id="register-form">
                                        <div className="form-group">
                                            <label htmlFor="email"><i className="zmdi zmdi-email" /></label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Your Email"
                                                value={form.email}
                                                onChange={handleAccountChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password"><i className="zmdi zmdi-lock" /></label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="Password"
                                                value={form.password}
                                                onChange={handleAccountChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="retype_password"><i className="zmdi zmdi-lock" /></label>
                                            <input
                                                type="password"
                                                name="retype_password"
                                                id="retype_password"
                                                placeholder="Retype Password"
                                                value={form.retype_password}
                                                onChange={handleAccountChange}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="role"><i className="zmdi zmdi-lock-outline" /></label>
                                            <select name="role" id="role" value={form.role} onChange={handleRoleChange}>
                                                <option value="" disabled>You are ...</option>
                                                <option value={Roles.Customer}>Customer</option>
                                                <option value={Roles.Driver}>Driver</option>
                                            </select>
                                        </div>

                                        {form.customer_profile && form.role === Roles.Customer
                                            && (
                                                <>
                                                    <div className="form-group">
                                                        <label htmlFor="customer_name"><i className="zmdi zmdi-customer_name" /></label>
                                                        <input
                                                            name="customer_name"
                                                            id="customer_name"
                                                            placeholder="Your full name"
                                                            value={form.customer_profile.customer_name}
                                                            onChange={handleCustomerInfoChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="phone_number"><i className="zmdi zmdi-phone_number" /></label>
                                                        <input
                                                            name="phone_number"
                                                            id="phone_number"
                                                            placeholder="Your phone"
                                                            value={form.customer_profile.phone_number}
                                                            onChange={handleCustomerInfoChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="year_of_birth"><i className="zmdi zmdi-year_of_birth" /></label>
                                                        <input
                                                            name="year_of_birth"
                                                            id="year_of_birth"
                                                            placeholder="Your birthday"
                                                            value={form.customer_profile.year_of_birth}
                                                            onChange={handleCustomerInfoChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="address"><i className="zmdi zmdi-address" /></label>
                                                        <input
                                                            name="address"
                                                            id="address"
                                                            placeholder="Your address"
                                                            value={form.customer_profile.address}
                                                            onChange={handleCustomerInfoChange}
                                                        />
                                                    </div>
                                                </>
                                            )
                                        }

                                        {form.driver_profile && form.role === Roles.Driver
                                            && (
                                                <>
                                                    <div className="form-group">
                                                        <label htmlFor="driver_name"><i className="zmdi zmdi-driver_name" /></label>
                                                        <input
                                                            name="driver_name"
                                                            id="driver_name"
                                                            placeholder="Your full name"
                                                            value={form.driver_profile.driver_name}
                                                            onChange={handleDriverInfoChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="phone_number"><i className="zmdi zmdi-phone_number" /></label>
                                                        <input
                                                            name="phone_number"
                                                            id="phone_number"
                                                            placeholder="Your phone"
                                                            value={form.driver_profile.phone_number}
                                                            onChange={handleDriverInfoChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="address"><i className="zmdi zmdi-address" /></label>
                                                        <input
                                                            name="address"
                                                            id="address"
                                                            placeholder="Your address"
                                                            value={form.driver_profile.address}
                                                            onChange={handleDriverInfoChange}
                                                        />
                                                    </div>
                                                </>
                                            )
                                        }

                                        <div className="form-group form-button">
                                            <input type="submit" name="signup" id="signup" className="form-submit" defaultValue="Register" />
                                        </div>
                                    </form>
                                </div>
                                <div className="signup-image">
                                    <figure><img src="/img/auth/signup-image.jpg" alt="sing up image" /></figure>
                                    <Link to={"/sign-in"} className="signup-image-link">I am already member</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default SignUpForm;