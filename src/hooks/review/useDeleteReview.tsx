import { ENDPOINTS } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useDeleteReview = (reviewId: string) => {
  return useCustomMutation({
    method: "delete",
    endpoint: ENDPOINTS.DELETE_REVIEW(reviewId),
  });
};

export default useDeleteReview;
