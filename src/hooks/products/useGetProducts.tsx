import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import { IProductItem } from "@/types/api.types";
import useQueryActionHook from "../use-queryaction";

const useGetProducts = (
  page: number,
  parameter: string,
  search: string,
  pageSize = 8
) => {
  return useQueryActionHook<IProductItem>({
    method: "get",
    endpoint: ENDPOINTS.GET_PRODUCTS_BY_SEARCH(
      page,
      parameter,
      search,
      pageSize
    ),
    queryKey: [NAMESPACE.GET_PRODUCTS_BY_SEARCH, page, search, pageSize],
    staleTime: 3600000,
  });
};

export default useGetProducts;
