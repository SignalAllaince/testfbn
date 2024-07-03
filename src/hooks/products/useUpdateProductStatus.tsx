import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useUpdateProductStatus = () => {
  return useCustomMutation({
    method: "put",
    endpoint: ENDPOINTS.UPDATE_PRODUCT_STATUS,
    queryKey: [NAMESPACE.UPDATE_PRODUCT_STATUS],
  });
};

export default useUpdateProductStatus;
