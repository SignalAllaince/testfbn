import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetCategory = (categoryId: string) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_SINGLE_CATEGORY(categoryId),
    queryKey: [NAMESPACE.GET_SINGLE_CATEGORY, categoryId],
  });
};

export default useGetCategory;
