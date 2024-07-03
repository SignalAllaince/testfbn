import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetCustomerCart = (customerId: string) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_CUSTOMER_CART(customerId),
    queryKey: [NAMESPACE.GET_CUSTOMER_CART, customerId],
  });
};

export default useGetCustomerCart;
