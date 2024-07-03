import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetStatesList = () => {
  return useQueryActionHook<
    {
      id: string;
      name: string;
      code: string;
    }[]
  >({
    method: "get",
    endpoint: ENDPOINTS.GET_STATE_LIST,
    queryKey: [NAMESPACE.GET_STATE_LIST],
  });
};

export default useGetStatesList;
