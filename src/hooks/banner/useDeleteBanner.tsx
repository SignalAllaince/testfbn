import { ENDPOINTS } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useDeleteBanner = (bannerId: string) => {
  return useCustomMutation({
    method: "delete",
    endpoint: ENDPOINTS.DELETE_BANNER(bannerId),
  });
};

export default useDeleteBanner;
