import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetShippingRate = (rateId: string) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_SHIPPING_RATE(rateId),
    queryKey: [NAMESPACE.GET_SHIPPING_RATE, rateId],
  });
};

export default useGetShippingRate;
