import { ENDPOINTS } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useUpdateBanner = () => {
  return useCustomMutation({
    method: "put",
    endpoint: ENDPOINTS.UPDATE_BANNER,
  });
};

export default useUpdateBanner;
