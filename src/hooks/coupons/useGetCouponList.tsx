import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import { ICouponListModel } from "@/types/api.types";
import useQueryActionHook from "../use-queryaction";

const useGetCouponList = ({
  page = 1,
  pageSize = 10,
  search,
  sort,
}: {
  page: number;
  pageSize: number;
  search?: string;
  sort?: string;
  startDate?: string;
  endDate?: string;
}) => {
  return useQueryActionHook<ICouponListModel>({
    method: "get",
    endpoint: ENDPOINTS.GET_COUPONS_LIST(page, pageSize, search, sort),
    queryKey: [NAMESPACE.GET_COUPONS_LIST, page, pageSize, search, sort],
  });
};

export default useGetCouponList;
