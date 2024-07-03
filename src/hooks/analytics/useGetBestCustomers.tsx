import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetBestCustomers = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  return useQueryActionHook<
    {
      customer: string;
      totalBought: number;
    }[]
  >({
    method: "get",
    endpoint: ENDPOINTS.GET_BEST_CUSTOMERS(startDate, endDate),
    queryKey: [NAMESPACE.GET_BEST_CUSTOMERS, startDate, endDate],
  });
};

export default useGetBestCustomers;
