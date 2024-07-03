import EmptyReview from "@/components/empty-review";
import ErrorMessage from "@/components/error-message";
import { rubik } from "@/components/fonts";
import IfElse from "@/components/if-else";
import TableLoader from "@/components/loader";
import { ReviewItem } from "@/types/api.types";
import { AnimatePresence } from "framer-motion";
import HistoryTableRow from "./review-tablerow";

/* eslint-disable no-constant-condition */
function ReviewsTable({
  loading,
  reviews,
  refetchReview,
}: {
  loading: boolean;
  reviews: ReviewItem[];
  refetchReview: () => void;
}) {
  return (
    <div className="overflow-x-auto  sm:rounded-lg">
      <table className="w-full text-left text-sm text-brand-darkest">
        <thead
          className={`${rubik.className} border-b border-t bg-white text-md font-light capitalize text-brand-darkest`}
        >
          <tr>
            <th scope="col" className="min-w-[150px] px-6 py-3 font-bold">
              Date
            </th>
            <th scope="col" className="min-w-[150px] px-6 py-3 font-bold">
              Buyer&apos;s Name
            </th>
            <th scope="col" className="min-w-[150px] px-6 py-3 font-bold">
              Product Name
            </th>

            <th scope="col" className="min-w-[150px] px-6 py-3 font-bold">
              Rating
            </th>
            <th scope="col" className="min-w-[200px] px-6 py-3 font-bold">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-right font-bold">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            <IfElse
              ifOn={!loading && !!reviews}
              ifOnElse={loading && !reviews}
              onElse={<TableLoader />}
              elseThen={
                <tr>
                  <td colSpan={6}>
                    <ErrorMessage />
                  </td>
                </tr>
              }
            >
              <IfElse
                ifOn={reviews && reviews?.length > 0}
                ifOnElse={reviews && reviews?.length === 0}
                onElse={
                  <tr>
                    <td colSpan={6}>
                      <EmptyReview />
                    </td>
                  </tr>
                }
              >
                <>
                  {reviews?.map((review) => (
                    <HistoryTableRow
                      refetchReview={refetchReview}
                      review={review}
                      key={review.id}
                    />
                  ))}
                </>
              </IfElse>
            </IfElse>
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}

export default ReviewsTable;
