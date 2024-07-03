import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useUpdateProductInCategory = (categoryId: string) => {
  return useCustomMutation({
    method: "put",
    endpoint: ENDPOINTS.UPDATE_PRODUCT_IN_CATEGORY(categoryId),
    queryKey: [NAMESPACE.UPDATE_PRODUCT_IN_CATEGORY, categoryId],
  });
};

export default useUpdateProductInCategory;
