import { ENDPOINTS } from "@/lib/constants";
import useCustomMutation from "../use-mutationaction";

const useUploadmedia = () => {
  return useCustomMutation<any, FormData>({
    method: "post",
    endpoint: ENDPOINTS.UPLOAD_MEDIA,
  });
};

export default useUploadmedia;
