import { ENDPOINTS } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useUserAuth = (userName: string, password: string) => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.AUTH_USER(userName, password),
    queryKey: ["user-authentication"],
  });
};

export default useUserAuth;
