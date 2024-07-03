import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useGetOpenIdConfig = () => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.AUTH_OPENID_CONFIG,
    queryKey: [NAMESPACE.AUTH_OPENID_CONFIG],
  });
};

export default useGetOpenIdConfig;
