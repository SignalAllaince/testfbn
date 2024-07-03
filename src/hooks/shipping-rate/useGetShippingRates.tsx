import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import { IShippingRateModel } from "@/types/api.types";
import useQueryActionHook from "../use-queryaction";

const useGetShippingRates = (page: number, pageSize = 10) => {
  return useQueryActionHook<IShippingRateModel>({
    method: "get",
    endpoint: ENDPOINTS.GET_SHIPPING_RATES(page, pageSize),
    queryKey: [NAMESPACE.GET_SHIPPING_RATES, page, pageSize],
    staleTime: 360000,
  });
};

export default useGetShippingRates;
