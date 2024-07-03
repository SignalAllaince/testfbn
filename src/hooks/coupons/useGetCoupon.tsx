import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetCoupon = (couponId: string) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_COUPON(couponId),
    queryKey: [NAMESPACE.GET_COUPON, couponId],
  });
};

export default useGetCoupon;
