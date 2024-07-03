import Image from "next/image";
import umbrellaImg from "../../../../../public/assets/umbrella.svg";

function ReportTableRow() {
  return (
    <>
      <tr className="border-b bg-white text-brand-darkest hover:bg-gray-50">
        <td className="w-32 p-4">
          <Image
            width={80}
            height={80}
            className="h-20 w-20 flex-shrink-0 rounded-sm"
            src={umbrellaImg}
            alt="Jese image"
          />{" "}
        </td>
        <td
          scope="row"
          className="mt-4 flex max-w-[300px] items-center whitespace-normal px-4 py-4"
        >
          <div className="">
            <div className=" font-normal">
              Independence Day Commemorative Notebook: The rest of the product
              Name goes here
            </div>
          </div>
        </td>
        <td scope="row" className="px-6 py-4">
          52
        </td>
        <td scope="row" className="px-6 py-4">
          Stationery
        </td>
        <td scope="col" className="px-6 py-4">
          Submersible Pencil
        </td>
        <td scope="row" className="px-6 py-4">
          10/03/2023
        </td>
      </tr>
    </>
  );
}

export default ReportTableRow;
