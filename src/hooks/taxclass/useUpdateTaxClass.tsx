import { ENDPOINTS } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useUpdateTaxClass = () => {
  return useCustomMutation({
    method: "put",
    endpoint: ENDPOINTS.UPDATE_TAXCLASS,
    message: "Tax class updated successfully",
  });
};

export default useUpdateTaxClass;
