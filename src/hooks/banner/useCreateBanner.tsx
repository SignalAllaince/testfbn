import { ENDPOINTS } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useCreateBanner = () => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.CREATE_BANNER,
    showSuccessToast: true,
  });
};

export default useCreateBanner;
