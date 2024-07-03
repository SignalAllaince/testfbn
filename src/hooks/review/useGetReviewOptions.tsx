import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import { IProductOrderBy } from "@/types/api.types";
import useQueryActionHook from "../use-queryaction";

const useGetReviewOptions = () => {
  return useQueryActionHook<IProductOrderBy[]>({
    method: "get",
    endpoint: ENDPOINTS.GET_REVIEW_OPTIONS,
    queryKey: [NAMESPACE.GET_REVIEW_OPTIONS],
  });
};

export default useGetReviewOptions;
