import {profileApi} from "./axios.tsx";

export const getProfileByUserId = async (userId: number, token: string) => {
    const response = await profileApi.get(`/profiles/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const createProfile = async (bio: string, avatarUrl: string, token: string)=> {
    const response = await profileApi.post(
        "/profiles",
        { bio, avatarUrl },
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
}