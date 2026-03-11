import { API_ENDPOINTS } from "@/configs/apis";
import api from "@/lib/axios";
import { GetMeResponse, LoginBody, LoginResponse } from "@/types/auth";

export const loginWithEmail = (body: LoginBody) =>
  api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, body);

export const getMe = () => api.get<GetMeResponse>(API_ENDPOINTS.AUTH.GET_ME);
