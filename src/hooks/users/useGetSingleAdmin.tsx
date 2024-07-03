import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import { IUserItem } from "@/types/api.types";
import useQueryActionHook from "../use-queryaction";

const useGetSingleAdmin = (email: string) => {
  return useQueryActionHook<IUserItem>({
    method: "get",
    endpoint: ENDPOINTS.GET_SINGLE_ADMIN(email),
    queryKey: [NAMESPACE.GET_SINGLE_ADMIN, email],
    enabled: !!email,
  });
};

export default useGetSingleAdmin;
