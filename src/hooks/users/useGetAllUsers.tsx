import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetAllUsers = () => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.GET_ALL_USERS,
    queryKey: [NAMESPACE.GET_ALL_USERS],
  });
};

export default useGetAllUsers;
