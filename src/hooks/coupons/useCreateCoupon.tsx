import { ENDPOINTS } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useCreateCoupon = () => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.CREATE_COUPON,
    showSuccessToast: true,
  });
};

export default useCreateCoupon;
