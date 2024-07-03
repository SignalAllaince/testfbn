import Button from "@/components/button";
import FadeInOut from "@/components/fade";
import IfElse from "@/components/if-else";
import useUpdateReviewStatus from "@/hooks/review/useChangeReviewStatus";
import useNotification from "@/hooks/use-notification";
import { renderEmoji } from "@/lib/constants/rating";
import { ReviewItem } from "@/types/api.types";
import CustomRating from "@/widgets/rating/Rating";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import React from "react";
import Modal from "..";

function ItemReviewModal({
  isOpen,
  onClose,
  review,
  refetchReview,
}: {
  isOpen: boolean;
  onClose: () => void;
  review: ReviewItem;
  refetchReview: () => void;
}) {
  const [approve, setApproved] = React.useState<null | number>(null);
  const { toast } = useNotification();
  const updateReviewStatus = useUpdateReviewStatus(
    review.id,
    review.productId,
    // @ts-expect-error
    approve
  );

  const approveReview = () => {
    setApproved(1);
  };

  const rejectReview = () => {
    setApproved(2);
  };

  React.useEffect(() => {
    if (approve) {
      updateReviewStatus.refetch().then((res) => {
        if (res.data?.status === 202) {
          toast({
            appearance: "success",
            description: `Review has been successfully ${
              approve === 1 ? "approved" : "rejected"
            }`,
          });
          setApproved(null);
          refetchReview();
          onClose();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approve]);

  return (
    <Modal isOpen={isOpen} closeModal={onClose} size="lg">
      <div className="space-y-4 py-4 md:px-3">
        <div className="relative">
          <h2 className="text-[1.5rem] font-semibold leading-6 text-obs-blue">
            Review Details
          </h2>
          <div className="mt-6 flex w-full items-center space-x-3">
            <div className="h-12 w-12 rounded bg-[#DAE8F2]"></div>
            <p className="w-[340px] text-md font-medium leading-6 text-obs-blue">
              {review.productName}
            </p>
          </div>

          <div className="mt-6 flex h-14 items-center justify-start gap-8 border-b border-t">
            <div className="flex items-center justify-start gap-2">
              <p className="text-md leading-[22px] text-obs-blue">Rating</p>
              <CustomRating rating={review.rating} />
            </div>
            <div className="flex items-center justify-start gap-2">
              <p>Reaction</p>
              <div className="flex items-center justify-start gap-2 text-sm text-brand-blue">
                <div className="w-4">
                  <Image src={renderEmoji(review.title)} alt="" />
                </div>
                <p>{review?.title}</p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-[15px] font-medium leading-[22px] text-obs-blue">
            Comment
          </p>
          <p className="mt-2 text-md font-light leading-[22px] text-obs-blue">
            {review.comment}
          </p>
          <AnimatePresence>
            <IfElse
              ifOn={review.status?.toLowerCase() === "pending"}
              ifOnElse={review.status?.toLowerCase() === "approved"}
              onElse={
                <FadeInOut className="mt-12 flex items-center justify-center gap-4 text-white">
                  <Button className="h-12 w-full uppercase">close</Button>
                </FadeInOut>
              }
              elseThen={
                <FadeInOut className="mt-12 flex items-center justify-center gap-4 text-white">
                  <Button className="h-12 w-full uppercase">Resolve</Button>
                </FadeInOut>
              }
            >
              <FadeInOut className="mt-12 flex items-center justify-center gap-4 text-white">
                <Button
                  className="h-12 w-full !bg-[#D93333] uppercase"
                  onClick={rejectReview}
                  isLoading={approve === 2 && updateReviewStatus.isFetching}
                >
                  reject
                </Button>
                <Button
                  className="h-12 w-full !bg-[#47C96B] uppercase"
                  isLoading={approve === 1 && updateReviewStatus.isFetching}
                  onClick={approveReview}
                >
                  approve
                </Button>
              </FadeInOut>
            </IfElse>
          </AnimatePresence>
        </div>
      </div>
    </Modal>
  );
}

export default ItemReviewModal;
