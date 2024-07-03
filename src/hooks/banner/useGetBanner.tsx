import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetBanner = (bannerId: string) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_SINGLE_BANNER(bannerId),
    queryKey: [NAMESPACE.GET_SINGLE_BANNER, bannerId],
  });
};

export default useGetBanner;
