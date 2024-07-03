import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetUserBySearch = (query: string) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_USERS_BY_QUICKSEARCH(query),
    queryKey: [NAMESPACE.GET_USERS_BY_QUICKSEARCH, query],
  });
};

export default useGetUserBySearch;
