export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token",
    GET_ME: "/auth/profile",
  },
};
