import { ENDPOINTS } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useDeleteCoupon = (couponId: string) => {
  return useCustomMutation({
    method: "delete",
    endpoint: ENDPOINTS.DELETE_COUPON(couponId),
  });
};

export default useDeleteCoupon;
