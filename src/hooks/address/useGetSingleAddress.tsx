import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetAddressList = (addressId: string) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_SINGLE_ADDRESS(addressId),
    queryKey: [NAMESPACE.GET_SINGLE_ADDRESS, addressId],
  });
};

export default useGetAddressList;
