import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetDefaultTaxClass = () => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_DEFAULT_TAXCLASS,
    queryKey: [NAMESPACE.GET_DEFAULT_TAXCLASS],
  });
};

export default useGetDefaultTaxClass;
