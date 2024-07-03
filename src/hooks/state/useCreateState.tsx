import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import { CreateProductResponse } from "@/types/api.types";
import useCustomMutation from "../use-mutationaction";

const useCreateState = () => {
  return useCustomMutation<CreateProductResponse, FormData>({
    method: "post",
    endpoint: ENDPOINTS.CREATE_STATE,
    queryKey: [NAMESPACE.CREATE_STATE],
  });
};

export default useCreateState;
