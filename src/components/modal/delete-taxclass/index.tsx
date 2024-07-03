import Button from "@/components/button";
import useDeleteTaxClass from "@/hooks/taxclass/useDeleteTaxClass";
import Modal from "..";

function DeleteTaxClass({
  isOpen,
  onClose,
  refetch,
  taxClassId,
}: {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  taxClassId: string;
}) {
  const deleteTax = useDeleteTaxClass(taxClassId);

  const deleteTaxHandler = () => {
    deleteTax
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
          <p>Are you sure you want to delete this tax class?</p>
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button
            spinnerColor="#003B65"
            onClick={deleteTaxHandler}
            isLoading={deleteTax.isLoading}
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

export default DeleteTaxClass;
