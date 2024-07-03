import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useAddItemToCustomerCart = (customerId: string) => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.ADD_ITEM_TO_CUSTOMER_CART(customerId),
    queryKey: [NAMESPACE.ADD_ITEM_TO_CUSTOMER_CART],
  });
};

export default useAddItemToCustomerCart;
