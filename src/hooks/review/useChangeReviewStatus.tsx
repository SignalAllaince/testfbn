import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useUpdateReviewStatus = (
  id: string,
  productId: string,
  approve: number
) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.CHANGE_REVIEW_STATUS(id, productId, approve === 1),
    queryKey: [NAMESPACE.CHANGE_REVIEW_STATUS, id, productId, approve],
    enabled: false,
  });
};

export default useUpdateReviewStatus;
