import { profileApi } from "./axios";

export const getProfileByUserId = async (userId: number, token?: string) => {
    const res = await profileApi.get(`/profiles/${userId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
};

export const createProfile = async (bio: string, avatarUrl: string, token?: string) => {
    const res = await profileApi.post(
        "/profiles",
        { bio, avatarUrl },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );
    return res.data;
};
