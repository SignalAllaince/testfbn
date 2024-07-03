import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetBranchSales = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_BRANCH_SALES(startDate, endDate),
    queryKey: [NAMESPACE.GET_BRANCH_SALES, startDate, endDate],
  });
};

export default useGetBranchSales;
