import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useAddProductToCategory = (categoryId: string) => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.ADD_PRODUCT_TO_CATEGORY(categoryId),
    queryKey: [NAMESPACE.ADD_PRODUCT_TO_CATEGORY, categoryId],
  });
};

export default useAddProductToCategory;
