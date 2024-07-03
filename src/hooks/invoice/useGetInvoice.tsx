import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetBanner = (invoiceId: string) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_TRANSACTION_INVOICE(invoiceId),
    queryKey: [NAMESPACE.GET_TRANSACTION_INVOICE, invoiceId],
  });
};

export default useGetBanner;
