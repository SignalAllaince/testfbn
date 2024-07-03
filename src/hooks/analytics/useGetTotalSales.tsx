import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetTotalSales = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_TOTAL_SALES(startDate, endDate),
    queryKey: [NAMESPACE.GET_TOTAL_SALES, startDate, endDate],
  });
};

export default useGetTotalSales;
