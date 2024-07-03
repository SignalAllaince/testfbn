import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetMostSearchedKeywords = () => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_MOST_SEARCHED_KEYWORDS,
    queryKey: [NAMESPACE.GET_MOST_SEARCHED_KEYWORDS],
  });
};

export default useGetMostSearchedKeywords;
