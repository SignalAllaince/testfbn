import { rubik } from "@/components/fonts";
import ReportTableRow from "./report-tablerow";

function ReportTable() {
  return (
    <>
      <div className="overflow-x-auto  sm:rounded-lg">
        <table className="w-full bg-white text-left text-sm text-brand-darkest">
          <thead
            className={`border-b !text-md capitalize text-gray-700 ${rubik.className}`}
          >
            <tr>
              <th scope="col" className="px-6 py-3 font-bold">
                Image
              </th>
              <th scope="col" className="px-6 py-3 font-bold">
                Item details
              </th>
              <th scope="col" className="px-6 py-3 font-bold">
                Stock
              </th>
              <th scope="col" className="px-6 py-3 font-bold">
                Category
              </th>
              <th scope="col" className="px-6 py-3 font-bold">
                Sub Category
              </th>
              <th scope="col" className="px-6 py-3 font-bold">
                Date Added
              </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((item) => (
              <ReportTableRow key={item} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ReportTable;
