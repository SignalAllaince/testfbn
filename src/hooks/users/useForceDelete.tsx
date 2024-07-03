import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useForceDeleteUser = (userId: string) => {
  return useCustomMutation({
    method: "delete",
    endpoint: ENDPOINTS.FORCE_DELETE_USER(userId),
    queryKey: [NAMESPACE.FORCE_DELETE_USER, userId],
  });
};

export default useForceDeleteUser;
