import { ENDPOINTS, NAMESPACE } from "@/lib/constants";
import useQueryActionHook from "../use-queryaction";

const useExportStatesByCountryId = (countryId: string) => {
  return useQueryActionHook({
    method: "get",
    endpoint: ENDPOINTS.EXPORT_STATES_BY_COUNTRYID(countryId),
    queryKey: [NAMESPACE.EXPORT_STATES_BY_COUNTRYID, countryId],
  });
};

export default useExportStatesByCountryId;
