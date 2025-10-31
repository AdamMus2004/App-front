import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext.tsx";

export default function RegisterPage(){
    const auth = useContext(AuthContext);
    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    if (!auth) return <p>Loading...</p>;

    const handleRegister = async () => {
        setError("");
        setSuccess("");
        try {
            await auth.register(name, email, password);
            setSuccess("Account created successfully!");
            setName("");
            setEmail("");
            setPassword("");
        } catch (err: any) {
            setError(err?.response?.data?.error || "Registration failed");
        }
    };

    return(
        <div className={"p-4 max-w-md mx-auto"}>
            <h1 className={"text-2xl font-bold mb-4"}>Register</h1>

            {error && <p className="text-red-500 mb-2">{error}</p>}
            {success && <p className="text-green-600 mb-2">{success}</p>}

            <input
                type="name"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="border p-2 mb-2 block"
            />
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
                onClick={handleRegister}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Register
            </button>
        </div>


    );
}