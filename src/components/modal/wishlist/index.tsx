import Button from "@/components/button";
import Modal from "..";

function WishListModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} closeModal={onClose} closeOnOverlayClick>
      <div className="space-y-8 py-6 md:px-5">
        <div className="text-md mx-auto max-w-sm text-center font-light ">
          <p>Are you sure you want to save this item to your wishlist?</p>
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button
            className="w-full px-2 text-sm uppercase"
            variant="secondary"
            onClick={onClose}
          >
            No, Cancel
          </Button>
          <Button className="w-full px-2 text-sm uppercase" href="/cart">
            Add to Wishlist
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default WishListModal;
