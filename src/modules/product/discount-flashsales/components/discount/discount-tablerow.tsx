import Button from "@/components/button";
import ApplyDiscountModal from "@/components/modal/discount";
import useDisclosure from "@/hooks/use-disclosure";
import { mergeCategories } from "@/lib/utils";
import { IItemSchema } from "@/types/api.types";
import Image from "next/image";
import umbrellaImg from "../../../../../../public/assets/umbrella.svg";

function DiscountTableRow({ product }: { product: IItemSchema }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <tr className="border-b bg-white hover:bg-gray-50">
        <td scope="row" className="w-36 px-6 py-4 text-center">
          #{product.id}
        </td>
        <td className="p-4">
          <Image
            width={80}
            height={80}
            className="h-20 w-20 flex-shrink-0 rounded-sm"
            src={product.thumbnailUrl ?? umbrellaImg}
            alt="Jese image"
          />{" "}
        </td>
        <td scope="row" className=" px-4 py-4">
          <div className=" font-normal">{product.name}</div>
        </td>

        <td scope="row" className="px-6 py-4">
          Stationery
        </td>
        <td scope="row" className="px-6 py-4 text-center">
          <div className=" font-normal">{product.stockQuantity}</div>
        </td>

        <td scope="row" className="relative px-4 py-4">
          <Button
            size="small"
            onClick={onOpen}
            className="mx-auto !h-9 w-[110px] flex-shrink-0 rounded !px-[2px] !text-sm"
          >
            Create Coupon
          </Button>
        </td>
      </tr>
      {isOpen && (
        <ApplyDiscountModal
          isOpen={isOpen}
          onClose={onClose}
          productId={product.id}
          category={mergeCategories(product.categories)}
        />
      )}
    </>
  );
}

export default DiscountTableRow;
