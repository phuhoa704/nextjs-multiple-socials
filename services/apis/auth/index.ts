import { API_ENDPOINTS } from "@/configs/apis";
import api from "@/lib/axios";
import { LoginBody, LoginResponse } from "@/types/auth";

export const loginWithEmail = (body: LoginBody) =>
  api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, body);
