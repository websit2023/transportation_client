import { ChangeEvent, FormEvent, FunctionComponent, useEffect, useState } from "react";
import { Roles } from "../SignUp";
import { updateCustomerProfile, updateDriverProfile } from "../../services/profile.service";
import { UserInterface } from "../../pages/AccountPage";
import { message } from 'antd';

interface ProfileProps {
    user: UserInterface
}

interface Profile {
    email: string
    name: string
    phone_number: string
    address: string
}

const Profile: FunctionComponent<ProfileProps> = ({ user }) => {
    const [profile, setProfile] = useState<Profile>({
        email: "",
        name: "",
        phone_number: "",
        address: ""
    })

    useEffect(() => {
        if (user) {
            setProfile({
                email: user.email,
                name: user.role === Roles.Customer
                    ? (user.customer?.customer_name || "")
                    : (user.driver?.driver_name || ""),
                phone_number: user.role === Roles.Customer
                    ? (user.customer?.phone_number || "")
                    : (user.driver?.phone_number || ""),
                address: user.role === Roles.Customer
                    ? (user.customer?.address || "")
                    : (user.driver?.address || "")
            })
        }
    }, [user])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setProfile(prevS => ({
            ...prevS,
            [name]: value
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (user.role === Roles.Customer) {
            const updated = await updateCustomerProfile({
                email: profile.email,
                address: profile.address,
                customer_name: profile.name,
                phone_number: profile.phone_number,
                role: Roles.Customer
            })

            if (!updated) {
                message.error("Update failed. Please try again!")
                return;
            }
        }

        if (user.role === Roles.Driver) {
            const updated = await updateDriverProfile({
                email: profile.email,
                address: profile.address,
                driver_name: profile.name,
                phone_number: profile.phone_number,
                role: Roles.Customer
            })

            if (!updated) {
                message.error("Update failed. Please try again!")
                return;
            }
        }

        message.success("Update successfully")
    }

    return (
        <div className="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
            <form onSubmit={handleSubmit}>
                <h3 className="mb-4">Account Settings</h3>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                onChange={handleChange}
                                value={profile.name}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Phone number</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone_number"
                                onChange={handleChange}
                                value={profile.phone_number}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                onChange={handleChange}
                                value={profile.address}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Role</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={user.role}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Bio</label>
                            <textarea className="form-control" rows={4} defaultValue={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore vero enim error similique quia numquam ullam corporis officia odio repellendus aperiam consequatur laudantium porro voluptatibus, itaque laboriosam veritatis voluptatum distinctio!"} />
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    );
}

export default Profile;