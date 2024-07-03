import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const usePostTaxClass = () => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.POST_TAXCLASS_LIST,
    queryKey: [NAMESPACE.POST_TAXCLASS_LIST],
  });
};

export default usePostTaxClass;
