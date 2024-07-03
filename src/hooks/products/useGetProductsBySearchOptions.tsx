import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import { IProductOrderBy } from "@/types/api.types";
import useQueryActionHook from "../use-queryaction";

const useGetProductsBySearchOptions = () => {
  return useQueryActionHook<IProductOrderBy[]>({
    method: "get",
    endpoint: ENDPOINTS.GET_PRODUCTS_SEARCH_OPTIONS,
    queryKey: [NAMESPACE.GET_PRODUCTS_SEARCH_OPTIONS],
  });
};

export default useGetProductsBySearchOptions;
