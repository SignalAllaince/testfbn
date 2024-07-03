import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetTaxRate = (taxId: string) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_SINGLE_TAX(taxId),
    queryKey: [NAMESPACE.GET_SINGLE_TAX, taxId],
  });
};

export default useGetTaxRate;
