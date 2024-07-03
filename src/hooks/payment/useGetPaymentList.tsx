import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import { ICategoryType } from "@/types/api.types";
import useQueryActionHook from "../use-queryaction";

const useGetPaymentList = () => {
  return useQueryActionHook<ICategoryType[]>({
    method: "get",
    endpoint: ENDPOINTS.GET_ADMIN_PAYMENT,
    queryKey: [NAMESPACE.GET_ADMIN_PAYMENT],
    staleTime: 3600000,
  });
};

export default useGetPaymentList;
