import { ENDPOINTS } from "@/lib/constants";
import { secureRequest } from "@/lib/utils/api.utils";
import { FirstBankResponseType, ResponseErrorType } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";

export const getQueryAction = (payload: any) => {
  const { endpoint, method, body, headers, isCreathorsApi = true } = payload;

  const url = isCreathorsApi ? ENDPOINTS.API_BASE_URL + endpoint : endpoint;

  return {
    queryFn: () => {
      return secureRequest({
        url,
        method,
        body,
        headers,
      });
    },
    ...payload,
  };
};

function useQueryActionHook<T>(data: any) {
  const { queryFn, queryKey, endpoint, ...others } = getQueryAction({
    ...data,
  });

  const queryResult = useQuery<FirstBankResponseType<T>, ResponseErrorType>({
    queryFn,
    queryKey: queryKey || endpoint,

    onError: (err) => {
      if (err) {
        // Push the error
      } else {
        //  push the error
      }
    },
    onSettled: () => {
      return;
    },
    retry: 2,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    ...others,
  });

  return {
    ...queryResult,
    value: queryResult.data?.data?.data,
    dataValue: queryResult.data?.data,
  };
}

export default useQueryActionHook;
