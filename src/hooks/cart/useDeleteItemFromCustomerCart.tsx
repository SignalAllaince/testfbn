import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useDeleteItemFromCustomerCart = (customerId: string, itemId: string) => {
  return useCustomMutation({
    method: "delete",
    endpoint: ENDPOINTS.DELETE_CUSTOMER_CART_ITEM(customerId, itemId),
    queryKey: [NAMESPACE.DELETE_CUSTOMER_CART_ITEM, itemId, customerId],
  });
};

export default useDeleteItemFromCustomerCart;
