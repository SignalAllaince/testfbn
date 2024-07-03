import Button from "@/components/button";
import useDeleteCategory from "@/hooks/category/useDeleteCategory";
import Modal from "..";

function DeleteCategory({
  isOpen,
  onClose,
  refetch,
  categoryId,
  name,
}: {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  categoryId: string;
  name: string;
}) {
  const delteteCategory = useDeleteCategory(categoryId);

  const delteteCategoryHandler = () => {
    delteteCategory
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
          <p>
            Are you sure you want to delete the{" "}
            <span className="font-bold">{name}</span> category?
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button
            spinnerColor="#003B65"
            onClick={delteteCategoryHandler}
            isLoading={delteteCategory.isLoading}
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

export default DeleteCategory;
