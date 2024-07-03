import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetTaxClass = (taxClassId: string) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_SINGLE_TAXCLASS(taxClassId),
    queryKey: [NAMESPACE.GET_SINGLE_TAXCLASS, taxClassId],
  });
};

export default useGetTaxClass;
