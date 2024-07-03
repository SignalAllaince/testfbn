import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetProductsBySearch = (search: string) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_PRODUCT_BY_SEARCH(search),
    queryKey: [NAMESPACE.GET_PRODUCT_BY_SEARCH, search],
  });
};

export default useGetProductsBySearch;
