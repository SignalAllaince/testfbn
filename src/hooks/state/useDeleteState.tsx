import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useDeleteState = (stateId: string) => {
  return useCustomMutation({
    method: "delete",
    endpoint: ENDPOINTS.DELETE_STATE(stateId),
    queryKey: [NAMESPACE.DELETE_STATE, stateId],
  });
};

export default useDeleteState;
