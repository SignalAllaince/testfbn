import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useUpdateDefaultAddress = () => {
  return useCustomMutation({
    method: "put",
    endpoint: ENDPOINTS.UPDATE_DEFAULT_ADDRESS,
    queryKey: [NAMESPACE.UPDATE_DEFAULT_ADDRESS],
  });
};

export default useUpdateDefaultAddress;
