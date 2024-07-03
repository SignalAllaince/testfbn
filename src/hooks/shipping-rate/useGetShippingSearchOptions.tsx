import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetShippingSearchOptions = () => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_SHIPPING_RATES_OPTIONS,
    queryKey: [NAMESPACE.GET_SHIPPING_RATES_OPTIONS],
  });
};

export default useGetShippingSearchOptions;
