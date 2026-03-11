import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/apis/auth";
import { useAppDispatch } from "@/store";
import { updateUser } from "@/store/slices/auth/authSlice";

export const useGetMe = (enabled: boolean = true) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: ["getMe"],
    queryFn: async () => {
      const response = await getMe();
      const userData = response.data;
      dispatch(updateUser(userData));
      return userData;
    },
    enabled,
    retry: false,
  });
};
