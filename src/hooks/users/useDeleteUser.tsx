import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useDeleteUser = (userId: string) => {
  return useCustomMutation({
    method: "delete",
    endpoint: ENDPOINTS.DELETE_USER(userId),
    queryKey: [NAMESPACE.DELETE_USER, userId],
  });
};

export default useDeleteUser;
