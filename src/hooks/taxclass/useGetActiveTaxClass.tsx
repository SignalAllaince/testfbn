import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import { ITaxClassModel } from "@/types/api.types";
import useQueryActionHook from "../use-queryaction";

const useGetActiveTaxClass = () => {
  return useQueryActionHook<ITaxClassModel[]>({
    method: "get",
    endpoint: ENDPOINTS.GET_ACTIVE_TAXCLASS,
    queryKey: [NAMESPACE.GET_ACTIVE_TAXCLASS],
    staleTime: 3600000,
  });
};

export default useGetActiveTaxClass;
