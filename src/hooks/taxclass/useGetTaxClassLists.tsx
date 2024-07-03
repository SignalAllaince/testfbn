import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetTaxClassLists = () => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_TAXCLASS_LISTS,
    queryKey: [NAMESPACE.GET_TAXCLASS_LISTS],
  });
};

export default useGetTaxClassLists;
