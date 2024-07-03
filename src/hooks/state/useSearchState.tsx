import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import { CreateProductResponse } from "@/types/api.types";
import useCustomMutation from "../use-mutationaction";

const useSearchState = () => {
  return useCustomMutation<CreateProductResponse, FormData>({
    method: "post",
    endpoint: ENDPOINTS.GET_STATES_BY_SEARCH,
    queryKey: [NAMESPACE.GET_STATES_BY_SEARCH],
  });
};

export default useSearchState;
