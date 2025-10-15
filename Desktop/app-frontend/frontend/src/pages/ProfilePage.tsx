import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.tsx";

export default function ProfilePage() {
    const auth = useContext(AuthContext);

    if (!auth?.user) return <p>Loading...</p>;
    return (
        <div className={"p-4"}>
            <h1 className={"text-2xl font-bold"}>Profile page</h1>
            <p>Name: {auth.user.name}</p>
            <p>Email: {auth.user.email}</p>
            <p>Role: {auth.user.role}</p>
            <button onClick={auth.logout} className={"mt-4 px-4 py-2 bg-red-500 text-white rounded"}>Logout</button>
        </div>
    );
}