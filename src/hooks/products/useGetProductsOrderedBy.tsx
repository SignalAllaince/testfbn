import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import { IProductOrderBy } from "@/types/api.types";
import useQueryActionHook from "../use-queryaction";

const useGetProductsOrderedBy = () => {
  return useQueryActionHook<IProductOrderBy[]>({
    method: "get",
    endpoint: ENDPOINTS.GET_PRODUCTS_ORDERBY,
    queryKey: [NAMESPACE.GET_PRODUCTS_ORDERBY],
    staleTime: 3600000,
  });
};

export default useGetProductsOrderedBy;
