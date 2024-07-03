import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import { ISinglOrderDetails } from "@/types/api.types";
import useQueryActionHook from "../use-queryaction";

const useGetOrderById = (orderId: string) => {
  return useQueryActionHook<ISinglOrderDetails>({
    method: "get",
    endpoint: ENDPOINTS.GET_ORDER_HISTORY(orderId),
    queryKey: [NAMESPACE.GET_ORDER_HISTORY, orderId],
    enabled: !!orderId,
  });
};

export default useGetOrderById;
