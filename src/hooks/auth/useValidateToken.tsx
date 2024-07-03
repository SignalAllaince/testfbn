import { ENDPOINTS } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useValidateToken = (userId: string, token: string) => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.TOKEN_VALIDATION(userId, token),
  });
};

export default useValidateToken;
