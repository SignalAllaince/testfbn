import Button from "@/components/button";
import Modal from "..";

function DeleteProductModal({
  isOpen,
  onClose,
  onRemoveHandler,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  onRemoveHandler?: () => void;
  isLoading?: boolean;
}) {
  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      <div className="space-y-8 py-6 md:px-5">
        <div className="mx-auto max-w-sm text-center text-md font-light">
          <p>Are you sure you want to delete this product?</p>
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button
            spinnerColor="#003B65"
            onClick={onRemoveHandler}
            isLoading={isLoading}
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

export default DeleteProductModal;
