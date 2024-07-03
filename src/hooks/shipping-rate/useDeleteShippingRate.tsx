import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useDeleteShippingRate = (rateId: string) => {
  return useCustomMutation({
    method: "delete",
    endpoint: ENDPOINTS.DELETE_SHIPPING_RATE(rateId),
    queryKey: [NAMESPACE.DELETE_SHIPPING_RATE, rateId],
    message: "Shipping rate deleted successfully",
  });
};

export default useDeleteShippingRate;
