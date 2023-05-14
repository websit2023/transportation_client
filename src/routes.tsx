import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SchedulePage from "./pages/SchedulePage";
import SignUpPage from "./pages/SignUpPage";
import CheckoutPage from "./pages/CheckoutPage";
import SignInPage from "./pages/SignInPage";
import AccountPage from "./pages/AccountPage";

function RootRoutes() {
    return (  
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/schedule" element={<SchedulePage />}/>
            <Route path="/sign-up" element={<SignUpPage />}/>
            <Route path="/sign-in" element={<SignInPage />}/>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={<AccountPage />} />
        </Routes>
    );
}

export default RootRoutes;