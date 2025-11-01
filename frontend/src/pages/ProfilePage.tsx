import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createProfile, getProfileByUserId } from "../api/profileApi";

export default function ProfilePage() {
    const auth = useContext(AuthContext);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [bio, setBio] = useState("");
    const [avatarUrl, setAvatarurl] = useState("");

    if (!auth) return <p>Loading...</p>;
    const { user, token } = auth;

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user || !token) return;
            try {
                const data = await getProfileByUserId(user.id, token);
                setProfile(data);
            } catch (err: any) {
                console.error("Profile fetch error:", err);
                setError("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user, token]);

    const handleCreateProfile = async () => {
        if (!token) return;
        try {
            const newProfile = await createProfile(bio, avatarUrl, token);
            setProfile(newProfile);
            setError("");
        } catch (err) {
            console.error("Create profile error:", err);
            setError("Failed to create profile");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">User profile</h1>
            {error && <p className="text-red-500 mb-2">{error}</p>}

            {profile ? (
                <div className="bg-gray-100 p-4 rounded">
                    <p><strong>Bio:</strong> {profile.bio}</p>
                    <p><strong>Avatar:</strong></p>
                    {profile.avatarUrl && (
                        <img src={profile.avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full mt-2" />
                    )}
                    <p><strong>Wilks Score:</strong> {profile.wilksScore ?? "No data"}</p>
                </div>
            ) : (
                <div className="mt-4">
                    <p>You don’t have a profile yet. Create one now</p>
                    <input
                        type="text"
                        placeholder="Your bio"
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                        className="border p-2 mb-2 block"
                    />
                    <input
                        type="text"
                        placeholder="Avatar URL"
                        value={avatarUrl}
                        onChange={e => setAvatarurl(e.target.value)}
                        className="border p-2 mb-2 block"
                    />
                    <button
                        onClick={handleCreateProfile}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Create profile
                    </button>
                </div>
            )}
        </div>
    );
}
