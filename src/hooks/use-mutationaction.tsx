import { ENDPOINTS } from "@/lib/constants";
import { secureRequest } from "@/lib/utils/api.utils";
import { formatErrors } from "@/lib/utils/common.utils";
import { FirstBankResponseType, ResponseErrorType } from "@/types/api.types";
import { useMutation } from "@tanstack/react-query";
import useNotification from "./use-notification";

const getMutationAction = (mutationData: any) => {
  const { endpoint, method, headers, isCreathorsApi = true } = mutationData;

  const url = isCreathorsApi ? ENDPOINTS.API_BASE_URL + endpoint : endpoint;

  return {
    mutationFn: (body: Record<string, unknown>) =>
      secureRequest({
        url,
        method,
        body,
        headers,
      }),
    ...mutationData,
  };
};

function useCustomMutation<
  P = Record<string, unknown>,
  T = Record<string, unknown>
>(mutationData: any) {
  const {
    mutationFn,
    endpoint,
    showSuccessToast = false,
    showFailureToast = true,
    message,
    ...others
  } = getMutationAction({
    ...mutationData,
  });
  const { toast } = useNotification();

  const mutatationResult = useMutation<
    FirstBankResponseType<P>,
    ResponseErrorType,
    T
  >(mutationFn, {
    mutationKey: endpoint,

    onError: (err) => {
      if (showFailureToast) {
        toast({
          title: `Request Failed`,
          description: `${
            err?.response?.data
              ? // @ts-expect-error
                formatErrors(err?.response?.data)
              : err.response?.data?.message
          }`,
          appearance: "error",
        });
      }
      mutatationResult.reset();
    },
    onSettled: (res, err) => {
      if (err) mutatationResult.reset();
      if (!err && (showSuccessToast || message)) {
        toast({
          title: message ? "" : `Request Successful`,
          description: `${message ?? res?.data?.message}`,
          appearance: "success",
        });
      }
      return;
    },
    retry: false,
    refetchOnWindowFocus: false,
    ...others,
  });

  return { ...mutatationResult, value: mutatationResult?.data?.data?.data };
}

export default useCustomMutation;
