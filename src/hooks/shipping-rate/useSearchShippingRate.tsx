import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import { IShippingRateModel } from "@/types/api.types";
import useQueryActionHook from "../use-queryaction";

const useSearchShippingRate = () => {
  return useQueryActionHook<IShippingRateModel>({
    method: "get",
    endpoint: ENDPOINTS.SEARCH_SHIPPING_RATE,
    queryKey: [NAMESPACE.SEARCH_SHIPPING_RATE],
  });
};

export default useSearchShippingRate;
