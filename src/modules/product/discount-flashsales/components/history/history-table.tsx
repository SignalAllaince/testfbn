import { rubik } from "@/components/fonts";
import Image from "next/image";
import umbrellaImg from "../../../../../../public/assets/umbrella.svg";
import EmptyHistory from "./empty-history";

function HistoryTable({ startFlashSales }: { startFlashSales: () => void }) {
  return (
    <div className="min-w-5xl  overflow-x-auto sm:rounded-lg">
      <table className="w-full text-left text-sm text-brand-darkest">
        <thead
          className={`${rubik.className} border-b border-t bg-white text-md font-light capitalize text-brand-darkest`}
        >
          <tr>
            <th scope="col" className="px-6 py-3">
              Banner
            </th>
            <th scope="col" className="px-6 py-3">
              Flash Sale Title
            </th>

            <th scope="col" className="whitespace-nowrap px-6 py-3">
              Product Count
            </th>
            <th scope="col" className="whitespace-nowrap px-6 py-3">
              Sales Count
            </th>
            <th scope="col" className="whitespace-nowrap px-6 py-3">
              Start Date
            </th>
            <th scope="col" className="whitespace-nowrap px-6 py-3">
              End Date
            </th>
            <th scope="col" className="whitespace-nowrap px-6 py-3">
              Status
            </th>
            <th scope="col" className="whitespace-nowrap px-6 py-3">
              Sales (₦)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={8}>
              <EmptyHistory onClick={startFlashSales} />
            </td>
          </tr>
          {null && (
            <>
              {[1, 2, 3, 4, 5].map((item) => (
                <tr className="border-b bg-white hover:bg-gray-50" key={item}>
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
                      <div className=" font-normal text-gray-500">
                        Independence Day Commemorative Notebook: The rest of the
                        product Name goes here
                      </div>
                    </div>
                  </td>

                  <td scope="col" className="px-6 py-4">
                    52
                  </td>
                  <td scope="col" className="px-6 py-4">
                    NIL
                  </td>
                  <td scope="col" className="px-6 py-4">
                    01-10-2023
                  </td>
                  <td scope="col" className="whitespace-nowrap px-6 py-4">
                    31-10-2023
                  </td>
                  <td scope="col" className="px-6 py-4">
                    Coming Soon
                  </td>
                  <td scope="col" className="px-6 py-4 text-center">
                    0
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryTable;
