import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetUserInfo = () => {
  return useQueryActionHook<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    profilePicture: string;
  }>({
    method: "get",
    endpoint: ENDPOINTS.GET_USER_INFO,
    queryKey: [NAMESPACE.GET_USER_INFO],
  });
};

export default useGetUserInfo;
