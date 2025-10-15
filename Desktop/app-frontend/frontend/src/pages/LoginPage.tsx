import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
    const auth = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    if (!auth) return <p>Loading...</p>;

    const handleLogin = async () => {
        try {
            await auth.login(email, password);
            alert("Login successful!");
        } catch (err: any) {
            setError(err?.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border p-2 mb-2 block"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border p-2 mb-2 block"
            />
            <button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Login
            </button>
        </div>
    );
}
