import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useUpdateShippingRate = () => {
  return useCustomMutation({
    method: "put",
    endpoint: ENDPOINTS.UPDATE_SHIPPING_RATE,
    queryKey: [NAMESPACE.UPDATE_SHIPPING_RATE],
  });
};

export default useUpdateShippingRate;
