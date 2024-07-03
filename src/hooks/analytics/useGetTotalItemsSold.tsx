import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetTotalItemsSold = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_TOTAL_ITEMS_SOLD(startDate, endDate),
    queryKey: [NAMESPACE.GET_TOTAL_ITEMS_SOLD, startDate, endDate],
  });
};

export default useGetTotalItemsSold;
