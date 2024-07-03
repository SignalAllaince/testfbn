import Button from "@/components/button";
import useDeleteTaxRate from "@/hooks/taxrate/useDeleteTaxRate";
import Modal from "..";

function DeleteTaxRate({
  isOpen,
  onClose,
  refetch,
  taxRateId,
}: {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  taxRateId: string;
}) {
  const deleteTaxRate = useDeleteTaxRate(taxRateId);

  const deleteTaxRateHandler = () => {
    deleteTaxRate
      .mutateAsync({})
      .then(() => {
        onClose();
        refetch();
      })
      .catch(console.log);
  };

  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      <div className="space-y-8 py-6 md:px-5">
        <div className="mx-auto max-w-sm text-center text-md font-light">
          <p>Are you sure you want to delete this tax rate?</p>
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button
            spinnerColor="#003B65"
            onClick={deleteTaxRateHandler}
            isLoading={deleteTaxRate.isLoading}
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

export default DeleteTaxRate;
