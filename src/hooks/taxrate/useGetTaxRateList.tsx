import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import { ITaxRateItem } from "@/types/api.types";
import useQueryActionHook from "../use-queryaction";

const useGetTaxRateList = () => {
  return useQueryActionHook<ITaxRateItem[]>({
    method: "get",
    endpoint: ENDPOINTS.GET_TAX_RATE_LIST,
    queryKey: [NAMESPACE.GET_TAX_RATE_LIST],
  });
};

export default useGetTaxRateList;
