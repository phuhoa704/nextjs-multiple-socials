import { useMutation } from "@tanstack/react-query";
import { loginWithEmail } from "@/services/apis/auth";
import { LoginBody } from "@/types/auth";

export const useLoginWithEmail = () => {
  return useMutation({
    mutationFn: (body: LoginBody) => loginWithEmail(body),
    onSuccess: () => {},
    onError: () => {},
  });
};
