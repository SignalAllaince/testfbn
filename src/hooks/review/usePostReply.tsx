import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const usePostReply = () => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.POST_REPLY,
    queryKey: [NAMESPACE.POST_REPLY],
  });
};

export default usePostReply;
