import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetSearchResult = (search: string) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_SEARCH_RESULT(search),
    queryKey: [NAMESPACE.GET_SEARCH_RESULT, search],
  });
};

export default useGetSearchResult;
