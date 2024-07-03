import { ENDPOINTS } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useDeleteTaxRate = (taxRateId: string) => {
  return useCustomMutation({
    method: "delete",
    endpoint: ENDPOINTS.DELETE_TAX(taxRateId),
    message: "Tax rate deleted successfully",
  });
};

export default useDeleteTaxRate;
