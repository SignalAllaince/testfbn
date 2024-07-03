import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import { useQueryClient } from "@tanstack/react-query";
import useCustomMutation from "../use-mutationaction";

const useUpdateOrderStatus = (orderId: string) => {
  const queryClient = useQueryClient();

  return useCustomMutation({
    method: "put",
    endpoint: ENDPOINTS.UPDATE_ORDER_STATUS(orderId),
    onSuccess(data: any) {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: [NAMESPACE.GET_ORDER_HISTORY],
        });
      }
    },
    message: `Order ${orderId} updated successfully`,
  });
};

export default useUpdateOrderStatus;
