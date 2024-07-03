import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useCreateShippingRate = () => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.CREATE_SHIPPING_RATE,
    queryKey: [NAMESPACE.CREATE_SHIPPING_RATE],
    message: `Shipping rate created successfully`,
  });
};

export default useCreateShippingRate;
