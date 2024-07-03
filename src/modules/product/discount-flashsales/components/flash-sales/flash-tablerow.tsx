import Button from "@/components/button";
import { IItemSchema } from "@/types/api.types";
import Image from "next/image";
import umbrellaImg from "../../../../../../public/assets/umbrella.svg";

function FlashTableRow({ product }: { product: IItemSchema }) {
  return (
    <tr className="border-b bg-white hover:bg-gray-50">
      <td scope="row" className="w-32 px-6 py-4 text-center">
        #{product.id}
      </td>
      <td className="w-32 p-4">
        <Image
          width={80}
          height={80}
          className="h-20 w-20 flex-shrink-0 rounded-sm"
          src={product.thumbnailUrl ?? umbrellaImg}
          alt="Jese image"
        />{" "}
      </td>
      <td
        scope="row"
        className="mt-4 flex max-w-[300px] items-center whitespace-normal px-4 py-4"
      >
        <div className="">
          <div className=" font-normal text-brand-darkest">{product.name}</div>
        </div>
      </td>

      <td scope="row" className="px-6 py-4">
        Stationery
      </td>
      <td scope="col" className="px-6 py-4 text-center">
        {product.status}
      </td>
      <td scope="row" className="relative  px-4 py-4">
        <Button
          size="small"
          className="ml-auto !h-9 w-auto flex-shrink-0 rounded !px-2 !text-sm"
        >
          Add to Flash Shares
        </Button>
      </td>
    </tr>
  );
}

export default FlashTableRow;
