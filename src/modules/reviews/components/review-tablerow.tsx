import IfElse from "@/components/if-else";
import ItemReviewModal from "@/components/modal/review";
import useDisclosure from "@/hooks/use-disclosure";
import { ReviewItem } from "@/types/api.types";
import CustomRating from "@/widgets/rating/Rating";
import dayjs from "dayjs";
import { motion } from "framer-motion";

function HistoryTableRow({
  review,
  refetchReview,
}: {
  review: ReviewItem;
  refetchReview: () => void;
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <motion.tr
        initial={{ opacity: 0.2 }}
        exit={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="border-b border-brand-lightest bg-white font-extralight hover:bg-gray-50"
      >
        <td scope="row" className="px-6 py-6">
          {dayjs(review.dateCreated!).format("DD-MM-YYYY")}
        </td>
        <td scope="row" className="px-6 py-6">
          {review.reviewerName}
        </td>
        <td scope="row" className="px-6 py-6">
          {review.productName}
        </td>
        <td scope="col" className="px-6 py-6">
          <CustomRating rating={review.rating} />
        </td>
        <td scope="col" className="px-6 py-6">
          {review.status}
        </td>
        <td scope="row" className="max-w-[150px] px-4 py-6 text-center">
          <div className="flex items-center justify-end pr-1">
            <IfElse
              ifOn={review.status === "Pending"}
              ifOnElse={review.status === "Approved"}
              onElse={
                <button
                  onClick={onOpen}
                  className="flex items-center justify-start rounded-[4px] border border-[#DAE8F2] bg-white px-3 py-1 text-sm font-medium leading-[14px] text-btn-blue"
                >
                  View
                </button>
              }
              elseThen={
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={onOpen}
                    className="flex items-center justify-start rounded-[4px] border border-[#DAE8F2] bg-white px-3 py-1 text-sm  font-medium leading-[14px] text-btn-blue"
                  >
                    View
                  </button>
                  <button className="h-6 w-[4.3rem] rounded-[2px] border border-[#DAE8F2] bg-btn-blue text-sm font-medium leading-[15px] text-white">
                    Resolve
                  </button>
                </div>
              }
            >
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={onOpen}
                  className="h-6 w-[3.3rem] rounded-[2px] border border-[#DAE8F2] bg-white text-sm font-medium leading-[15px] text-btn-blue"
                >
                  View
                </button>
                <button
                  onClick={onOpen}
                  className="h-6 w-[4.56rem] rounded-[2px] border border-[#DAE8F2] bg-[#47C96B] text-sm font-medium leading-[15px] text-white"
                >
                  Approve
                </button>
                <button
                  onClick={onOpen}
                  className="h-6 w-[3.75rem] rounded-[2px] border border-[#DAE8F2] bg-error-100 text-sm font-medium leading-[15px] text-white"
                >
                  Reject
                </button>
              </div>
            </IfElse>
          </div>
        </td>
      </motion.tr>
      <ItemReviewModal
        isOpen={isOpen}
        onClose={onClose}
        refetchReview={refetchReview}
        review={review}
      />
    </>
  );
}

export default HistoryTableRow;
