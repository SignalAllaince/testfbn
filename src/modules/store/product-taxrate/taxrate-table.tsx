import FadeInOut from "@/components/fade";
import { rubik } from "@/components/fonts";

function TaxRateTable({ children }: { children: React.ReactNode }) {
  return (
    <FadeInOut className="overflow-x-auto  sm:rounded-lg">
      <table className="w-full text-left text-sm text-brand-darkest">
        <thead
          className={`${rubik.className} border-b text-md capitalize text-gray-700`}
        >
          <tr>
            <th scope="col" className="min-w-[200px] px-6 py-4 font-bold">
              <p className="font-bold">Related Tax Class</p>
            </th>
            <th scope="col" className="min-w-[150px] px-6 py-4 font-bold">
              State Applied to
            </th>
            <th
              scope="col"
              className="min-w-[150px] px-6 py-4 text-center font-bold"
            >
              Rate (%)
            </th>
            <th
              scope="col"
              className="min-w-[150px] px-6 py-4 text-center font-bold"
            >
              Zip code
            </th>
            <th scope="col" className=" px-6 py-4 font-medium">
              {" "}
            </th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </FadeInOut>
  );
}

export default TaxRateTable;
