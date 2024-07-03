import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetOrderStatus = () => {
  return useQueryActionHook<{ name: string; id: string }[]>({
    method: "get",
    endpoint: ENDPOINTS.GET_ORDER_STATUS,
    queryKey: [NAMESPACE.GET_ORDER_STATUS],
  });
};

export default useGetOrderStatus;
