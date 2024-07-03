import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import { taxClassProps } from "@/types/api.types";
import useQueryActionHook from "../use-queryaction";

const useGetTaxClassList = () => {
  return useQueryActionHook<taxClassProps[]>({
    method: "get",
    endpoint: ENDPOINTS.GET_TAXCLASS_LIST,
    queryKey: [NAMESPACE.GET_TAXCLASS_LIST],
  });
};

export default useGetTaxClassList;
