import { ENDPOINTS } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useUpdateTaxRate = () => {
  return useCustomMutation({
    method: "put",
    endpoint: ENDPOINTS.UPDATE_TAX_RATE,
    message: "Tax rate updated successfully",
  });
};

export default useUpdateTaxRate;
