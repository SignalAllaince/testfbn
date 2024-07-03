import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useUpdateStateDetails = () => {
  return useCustomMutation({
    method: "put",
    endpoint: ENDPOINTS.UPDATE_STATE_DETAILS,
    queryKey: [NAMESPACE.UPDATE_STATE_DETAILS],
  });
};

export default useUpdateStateDetails;
