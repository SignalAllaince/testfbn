import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import { ICategoryType } from "@/types/api.types";
import useQueryActionHook from "../use-queryaction";

const useGetBannerList = () => {
  return useQueryActionHook<ICategoryType[]>({
    method: "get",
    endpoint: ENDPOINTS.GET_BANNER_LIST,
    queryKey: [NAMESPACE.GET_BANNER_LIST],
    staleTime: 3600000,
  });
};

export default useGetBannerList;
