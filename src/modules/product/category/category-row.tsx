import Button from "@/components/button";
import Icon from "@/components/icon";
import DeleteCategory from "@/components/modal/delete-category";
import UpdateCategoryModal from "@/components/modal/update-category";
import useDisclosure from "@/hooks/use-disclosure";
import { categoryIcons } from "@/lib/utils/component.utils";
import { ICategoryType } from "@/types/api.types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

function CategoryTableRow({
  category,
  refetchCategories,
}: {
  category: ICategoryType;
  refetchCategories: () => void;
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const CatIcon = categoryIcons.find(
    (icon) => icon.value === category.icon
  )?.icon;
  const {
    isOpen: isEditOpen,
    onClose: onEditClose,
    onOpen: onEditOpen,
  } = useDisclosure();
  return (
    <>
      <motion.tr
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="border-b bg-white text-brand-darkest hover:bg-gray-50"
      >
        <td scope="row" className="px-6 py-3">
          {category.id}
        </td>
        <td scope="row" className="px-6 py-3">
          {category.name}
        </td>
        <td scope="row" className="px-6 py-3 text-center">
          {category.status === "Active" ? (
            <span className="grid w-fit place-items-center rounded-2xl bg-green-100 p-2 px-4 text-sm font-extrabold capitalize text-green-800">
              <span className="m-0 p-0">Active</span>
            </span>
          ) : (
            <span className="grid w-fit place-items-center rounded-2xl bg-red-100 p-2 px-4 text-sm font-extrabold capitalize text-red-700">
              <span className="m-0 p-0">Inactive</span>
            </span>
          )}
        </td>
        <td scope="row" className="px-6 py-3">
          {CatIcon ? <Icon IconComp={CatIcon} /> : ""}
        </td>
        <td scope="row" className="relative px-6 py-3">
          <div className="flex">
            <Button size="xs" variant="minimenu" onClick={onOpen}>
              <Icon boxSize={4} className="text-red-500" IconComp={TrashIcon} />
            </Button>
            <Button size="xs" variant="minimenu" onClick={onEditOpen}>
              <Icon
                boxSize={4}
                className="text-brand-blue"
                IconComp={PencilIcon}
              />
            </Button>
          </div>
        </td>
      </motion.tr>

      <DeleteCategory
        isOpen={isOpen}
        onClose={onClose}
        name={category.name}
        refetch={refetchCategories}
        categoryId={category.id}
      />

      <UpdateCategoryModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        refetch={refetchCategories}
        defaultValues={category}
      />
    </>
  );
}

export default CategoryTableRow;
