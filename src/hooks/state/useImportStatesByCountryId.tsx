import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import { CreateProductResponse } from "@/types/api.types";
import useCustomMutation from "../use-mutationaction";

const useImportStatesByCountryId = (countryId: string) => {
  return useCustomMutation<CreateProductResponse, FormData>({
    method: "post",
    endpoint: ENDPOINTS.IMPORT_STATES_BY_COUNTRYID(countryId),
    queryKey: [NAMESPACE.IMPORT_STATES_BY_COUNTRYID, countryId],
  });
};

export default useImportStatesByCountryId;
