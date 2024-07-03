import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetProductReview = (
  productId: string,
  pageNumber: number,
  pageSize: number
) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_PRODUCT_REVIEWS(productId, pageNumber, pageSize),
    queryKey: [NAMESPACE.GET_PRODUCT_REVIEWS, productId, pageNumber],
  });
};

export default useGetProductReview;
