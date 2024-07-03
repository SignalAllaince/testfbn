import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import { CreateProductResponse } from "@/types/api.types";
import useCustomMutation from "../use-mutationaction";

const useCreatedAddress = () => {
  return useCustomMutation<CreateProductResponse, FormData>({
    method: "post",
    endpoint: ENDPOINTS.CREATE_ADDRESS,
    queryKey: [NAMESPACE.CREATE_ADDRESS],
  });
};

export default useCreatedAddress;
