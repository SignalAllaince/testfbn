import ProductDetailsDrawer from "@/components/drawer/product";
import Icon from "@/components/icon";
import { Menu, MenuButton, MenuItem, MenuItems } from "@/components/menu";
import DeleteProductModal from "@/components/modal/delete-product";
import useDeleteProduct from "@/hooks/products/useDeleteProduct";
import useDisclosure from "@/hooks/use-disclosure";
import { mergeCategories } from "@/lib/utils";
import { IItemSchema } from "@/types/api.types";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import Image from "next/image";
import umbrellaImg from "../../../../../public/assets/umbrella.svg";

function InventoryTableRow({
  product,
  isLast = false,
  refetchProducts,
}: {
  product: IItemSchema;
  isLast?: boolean;
  refetchProducts: () => void;
}) {
  const deleteProduct = useDeleteProduct(product.id);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onClose: onDrawerClose,
    onOpen: onDrawerOpen,
  } = useDisclosure();

  const deleteProductHandler = () => {
    deleteProduct.mutateAsync({}).then(() => {
      refetchProducts();
      onClose();
    });
  };
  return (
    <>
      <DeleteProductModal
        onRemoveHandler={deleteProductHandler}
        isOpen={isOpen}
        onClose={onClose}
        isLoading={deleteProduct.isLoading}
      />
      <ProductDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={onDrawerClose}
        productId={product.id}
        category={mergeCategories(product?.categories)}
      />

      <motion.tr
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="border-b bg-white text-brand-darkest hover:bg-gray-50"
      >
        <td className="w-32 p-4 py-3">
          <Image
            width={80}
            height={80}
            className="h-20 w-20 flex-shrink-0 rounded-sm"
            src={product.thumbnailUrl ?? umbrellaImg}
            alt="Jese image"
          />{" "}
        </td>
        <td scope="row" className="max-w-[300px] whitespace-normal px-4 py-3">
          <div className=" font-normal">{product.name}</div>
        </td>
        <td scope="row" className="px-6 py-3">
          {product.stockQuantity}
        </td>
        <td scope="row" className="px-6 py-3">
          {mergeCategories(product?.categories)}
        </td>
        {/* <td scope="col" className="px-6 py-3">
          Submersible Pencil
        </td> */}
        <td scope="row" className="px-6 py-3">
          {dayjs(product.dateCreated).format("DD/MM/YYYY")}
        </td>
        <td scope="row" className="relative px-6 py-3">
          <Menu>
            <MenuButton className="text-brand-darkest">
              <Icon IconComp={EllipsisHorizontalIcon} />
            </MenuButton>
            <MenuItems
              menuClasses={`${
                isLast ? "right-0 -bottom-6" : "right-0"
              }  !w-36 bg-[#F5F8FA] divide-y mt-2 divide-gray-100`}
            >
              <MenuItem
                className="h-[38px] text-sm"
                leftIcon={<Icon IconComp={EyeIcon} boxSize={4} />}
                onClick={onDrawerOpen}
              >
                View
              </MenuItem>
              <MenuItem
                className="h-[38px] text-sm"
                leftIcon={<Icon IconComp={PencilIcon} boxSize={4} />}
                href={`/inventory/edit/${product.id}`}
              >
                Edit
              </MenuItem>
              <MenuItem
                className="h-[38px] text-sm !text-red-600"
                leftIcon={<Icon IconComp={TrashIcon} boxSize={4} />}
                onClick={onOpen}
              >
                Delete
              </MenuItem>
            </MenuItems>
          </Menu>
        </td>
      </motion.tr>
    </>
  );
}

export default InventoryTableRow;
