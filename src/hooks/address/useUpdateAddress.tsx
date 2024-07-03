import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useUpdateAddress = (addressId: string) => {
  return useCustomMutation({
    method: "put",
    endpoint: ENDPOINTS.UPDATE_SINGLE_ADDRESS(addressId),
    queryKey: [NAMESPACE.UPDATE_SINGLE_ADDRESS],
  });
};

export default useUpdateAddress;
