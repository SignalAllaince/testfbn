import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

import { useQueryClient } from "@tanstack/react-query";

const useUpdateUser = () => {
  // Get QueryClient from the context
  const queryClient = useQueryClient();

  return useCustomMutation({
    method: "put",
    endpoint: ENDPOINTS.UPDATE_USER_DETAILS,
    onSuccess(data: any) {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: [NAMESPACE.POST_USERS_BY_SEARCH],
        });
      }
    },
  });
};

export default useUpdateUser;
