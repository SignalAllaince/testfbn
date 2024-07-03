import Button from "@/components/button";
import useDeleteShippingRate from "@/hooks/shipping-rate/useDeleteShippingRate";
import Modal from "..";

function DeleteShippingRate({
  isOpen,
  onClose,
  refetch,
  shippingRateId,
}: {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  shippingRateId: string;
}) {
  const deleteShippingRate = useDeleteShippingRate(shippingRateId);

  const deleteShippingRateHandler = () => {
    deleteShippingRate
      .mutateAsync({})
      .then(() => {
        refetch();
      })
      .catch(console.log);
  };

  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      <div className="space-y-8 py-6 md:px-5">
        <div className="mx-auto max-w-sm text-center text-md font-light">
          <p>Are you sure you want to delete this shipping rate?</p>
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button
            spinnerColor="#003B65"
            onClick={deleteShippingRateHandler}
            isLoading={deleteShippingRate.isLoading}
            className="w-full px-2 text-md uppercase"
            variant="secondary"
          >
            Delete
          </Button>
          <Button className="w-full px-2 text-md uppercase" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteShippingRate;
