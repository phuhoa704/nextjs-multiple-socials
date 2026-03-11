import { useMutation } from "@tanstack/react-query";
import { loginWithEmail } from "@/services/apis/auth";
import { LoginBody } from "@/types/auth";
import { useAppDispatch } from "@/store";
import { setCredentials } from "@/store/slices/auth/authSlice";

export const useLoginWithEmail = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (body: LoginBody) => loginWithEmail(body),
    onSuccess: (response) => {
      const { user, token } = response.data;

      // 1. Set localStorage FIRST so Axios interceptor can see it immediately
      localStorage.setItem("access_token", token);

      // 2. Then update Redux state
      dispatch(setCredentials({ user, accessToken: token }));
    },
    onError: () => {},
  });
};
