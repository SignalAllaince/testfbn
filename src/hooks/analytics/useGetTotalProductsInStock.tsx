import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetTotalProductsInStock = () => {
  return useQueryActionHook<string>({
    method: "get",
    endpoint: ENDPOINTS.GET_TOTAL_PRODUCT_INSTOCK,
    queryKey: [NAMESPACE.GET_TOTAL_PRODUCT_INSTOCK],
  });
};

export default useGetTotalProductsInStock;
