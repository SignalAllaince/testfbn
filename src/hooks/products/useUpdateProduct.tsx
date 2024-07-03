import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useUpdateProduct = () => {
  return useCustomMutation({
    method: "put",
    endpoint: ENDPOINTS.UPDATE_PRODUCT,
    queryKey: [NAMESPACE.UPDATE_PRODUCT],
  });
};

export default useUpdateProduct;
