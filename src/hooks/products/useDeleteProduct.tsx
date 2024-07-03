import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useDeleteProduct = (productId: number) => {
  return useCustomMutation({
    method: "delete",
    endpoint: ENDPOINTS.DELETE_PRODUCT(productId),
    queryKey: [NAMESPACE.DELETE_PRODUCT, productId],
  });
};

export default useDeleteProduct;
