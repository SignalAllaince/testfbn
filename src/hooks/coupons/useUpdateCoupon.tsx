import { ENDPOINTS } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useUpdateCoupon = (couponId: string) => {
  return useCustomMutation({
    method: "put",
    endpoint: ENDPOINTS.UPDATE_COUPON(couponId),
  });
};

export default useUpdateCoupon;
