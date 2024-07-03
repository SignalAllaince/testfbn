import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import { ICategoryType } from "@/types/api.types";
import useQueryActionHook from "../use-queryaction";

const useGetCategoryList = () => {
  return useQueryActionHook<ICategoryType[]>({
    method: "get",
    endpoint: ENDPOINTS.GET_CATEGORY_LIST,
    queryKey: [NAMESPACE.GET_CATEGORY_LIST],
    staleTime: 3600000,
  });
};

export default useGetCategoryList;
