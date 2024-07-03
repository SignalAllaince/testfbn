import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import { IUserItem } from "@/types/api.types";
import useQueryActionHook from "../use-queryaction";

const usePostUserSearch = (page: number) => {
  return useQueryActionHook<IUserItem>({
    method: "get",
    endpoint: ENDPOINTS.POST_USERS_BY_SEARCH(page),
    queryKey: [NAMESPACE.POST_USERS_BY_SEARCH, page],
  });
};

export default usePostUserSearch;
