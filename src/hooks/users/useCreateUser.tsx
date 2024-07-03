import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useCreateUser = () => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.CREATE_USER,
    queryKey: [NAMESPACE.CREATE_USER],
  });
};

export default useCreateUser;
