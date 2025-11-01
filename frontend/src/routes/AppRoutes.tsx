import {Route, Routes} from "react-router-dom";
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import LoginPage from "../pages/LoginPage.tsx";
import DashboardPage from "../pages/DashboardPage.tsx";
import RegisterPage from "../pages/RegisterPage.tsx";


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/register" element={<RegisterPage />} />

        </Routes>
    )
}