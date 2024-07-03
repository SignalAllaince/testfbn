import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import { IReviewListModel } from "@/types/api.types";
import useQueryActionHook from "../use-queryaction";

const useGetReviewList = ({
  page = 1,
  pageSize = 10,
  search,
  sort,
  startDate,
  endDate,
}: {
  page: number;
  pageSize: number;
  search?: string;
  sort?: string;
  startDate?: string;
  endDate?: string;
}) => {
  return useQueryActionHook<IReviewListModel>({
    method: "get",
    endpoint: ENDPOINTS.GET_REVIEW_LIST(
      page,
      pageSize,
      startDate,
      endDate,
      search,
      sort
    ),
    queryKey: [
      NAMESPACE.GET_REVIEW_LIST,
      page,
      pageSize,
      startDate,
      endDate,
      search,
      sort,
    ],
  });
};

export default useGetReviewList;
