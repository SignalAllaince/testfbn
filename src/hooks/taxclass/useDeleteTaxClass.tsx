import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useDeleteTaxClass = (taxClassId: string) => {
  return useCustomMutation({
    method: "delete",
    endpoint: ENDPOINTS.DELETE_TAXCLASS(taxClassId),
    queryKey: [NAMESPACE.DELETE_TAXCLASS, taxClassId],
    message: "Tax class deleted successfully",
  });
};

export default useDeleteTaxClass;
