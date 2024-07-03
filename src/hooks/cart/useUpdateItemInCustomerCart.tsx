import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useUpdateItemInCustomerCart = (customerId: string) => {
  return useCustomMutation({
    method: "put",
    endpoint: ENDPOINTS.UPDATE_CUSTOMER_CART_ITEM_QUANTITY(customerId),
    queryKey: [NAMESPACE.UPDATE_CUSTOMER_CART_ITEM_QUANTITY, customerId],
  });
};

export default useUpdateItemInCustomerCart;
