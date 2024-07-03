import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useUpdateCategory = () => {
  return useCustomMutation({
    method: "put",
    endpoint: ENDPOINTS.UPDATE_CATEGORY,
    queryKey: [NAMESPACE.UPDATE_CATEGORY],
  });
};

export default useUpdateCategory;
