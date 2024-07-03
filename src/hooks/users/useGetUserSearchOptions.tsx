import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetUserSearchOptions = () => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_USER_SEARCH_OPTIONS,
    queryKey: [NAMESPACE.GET_USER_SEARCH_OPTIONS],
  });
};

export default useGetUserSearchOptions;
