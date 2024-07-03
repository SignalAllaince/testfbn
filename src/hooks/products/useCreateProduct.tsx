import { ENDPOINTS } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useCreateProduct = () => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.CREATE_PRODUCTS,
  });
};

export default useCreateProduct;
