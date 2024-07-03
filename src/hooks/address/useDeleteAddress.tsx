import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useDeleteAddress = () => {
  return useCustomMutation({
    method: "delete",
    endpoint: ENDPOINTS.DELETE_ADDRESS,
    queryKey: [NAMESPACE.DELETE_ADDRESS],
  });
};

export default useDeleteAddress;
