import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import { IProductOrderBy } from "@/types/api.types";
import useQueryActionHook from "../use-queryaction";

const useGetOrderOptions = () => {
  return useQueryActionHook<IProductOrderBy[]>({
    method: "get",
    endpoint: ENDPOINTS.GET_ORDER_SEARCH_OPTION,
    queryKey: [NAMESPACE.GET_ORDER_SEARCH_OPTION],
  });
};

export default useGetOrderOptions;
