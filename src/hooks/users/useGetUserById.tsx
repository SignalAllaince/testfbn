import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetUserById = (userId: string) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_USER_BY_ID(userId),
    queryKey: [NAMESPACE.GET_USER_BY_ID, userId],
  });
};

export default useGetUserById;
