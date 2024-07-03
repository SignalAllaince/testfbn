import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetSalesOverview = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_SALES_OVERVIEW(startDate, endDate),
    queryKey: [NAMESPACE.GET_SALES_OVERVIEW, startDate, endDate],
  });
};

export default useGetSalesOverview;
