import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useUpdateCategoryStatus = () => {
  return useCustomMutation({
    method: "put",
    endpoint: ENDPOINTS.UPDATE_CATEGORY_STATUS,
    queryKey: [NAMESPACE.UPDATE_CATEGORY_STATUS],
  });
};

export default useUpdateCategoryStatus;
