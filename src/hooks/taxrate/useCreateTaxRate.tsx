import { ENDPOINTS } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useCreateTaxRate = () => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.CREATE_TAX_RATE,
    message: `Tax rate created successfully`,
  });
};

export default useCreateTaxRate;
