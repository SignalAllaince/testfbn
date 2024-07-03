import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const usePostShippingRates = () => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.POST_SHIPPING_RATES,
    queryKey: [NAMESPACE.POST_SHIPPING_RATES],
  });
};

export default usePostShippingRates;
