import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetAddressList = () => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_ADDRESS_LIST,
    queryKey: [NAMESPACE.GET_ADDRESS_LIST],
  });
};

export default useGetAddressList;
