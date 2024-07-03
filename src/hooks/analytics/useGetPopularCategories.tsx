import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetPopularCategories = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_POPULAR_CATEGORIES(startDate, endDate),
    queryKey: [NAMESPACE.GET_POPULAR_CATEGORIES, startDate, endDate],
  });
};

export default useGetPopularCategories;
