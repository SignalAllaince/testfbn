import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useAddItemsToCustomerCart = (customerId: string) => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.ADD_ITEMS_TO_CUSTOMER_CART(customerId),
    queryKey: [NAMESPACE.ADD_ITEMS_TO_CUSTOMER_CART, customerId],
  });
};

export default useAddItemsToCustomerCart;
