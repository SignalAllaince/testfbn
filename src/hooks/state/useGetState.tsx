import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetState = (stateId: string) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_SINGLE_STATE(stateId),
    queryKey: [NAMESPACE.GET_SINGLE_STATE, stateId],
  });
};

export default useGetState;
