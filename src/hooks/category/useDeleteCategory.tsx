import { ENDPOINTS } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useDeleteCategory = (categoryId: string) => {
  return useCustomMutation({
    method: "delete",
    endpoint: ENDPOINTS.DELETE_CATEGORY(categoryId),
    message: "Category deleted successfully",
  });
};

export default useDeleteCategory;
