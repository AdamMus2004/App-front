import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function DashboardPage() {
    const auth = useContext(AuthContext);

    if (!auth || !auth.user) {
        return <p>Loading...</p>;
    }

    const handleLogout = () => {
        auth.logout();
        alert("Logged out!");
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p><strong>Name:</strong> {auth.user.name}</p>
            <p><strong>Email:</strong> {auth.user.email}</p>
            <p><strong>Role:</strong> {auth.user.role}</p>

            <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
                Logout
            </button>
        </div>
    );
}
