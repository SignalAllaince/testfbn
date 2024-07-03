import FadeInOut from "@/components/fade";
import { rubik } from "@/components/fonts";
import { RateItem } from "@/types/api.types";
import ShippingTableRow from "./shipping-row";

function ShippingTable({
  shippingRatesData,
  refetch,
}: {
  shippingRatesData: RateItem[];
  refetch: () => void;
}) {
  return (
    <FadeInOut className="overflow-x-auto  sm:rounded-lg">
      <table className="w-full text-left text-sm text-brand-darkest">
        <thead
          className={`${rubik.className} border-b text-md capitalize text-gray-700`}
        >
          <tr>
            <th scope="col" className="min-w-[150px] px-6 py-4 font-bold">
              <p className="font-bold">Name</p>
            </th>
            <th scope="col" className="min-w-[150px] px-6 py-4 font-bold">
              Tax Class
            </th>
            <th scope="col" className="min-w-[150px] px-6 py-4 font-bold">
              Provider Name
            </th>
            <th scope="col" className="min-w-[200px] px-6 py-4 font-bold">
              min Order Subtotal
            </th>
            <th scope="col" className="min-w-[150px] px-6 py-4 font-bold">
              shipping Price
            </th>
            <th scope="col" className=" px-6 py-4 font-medium">
              {" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {shippingRatesData.map((rate) => (
            <ShippingTableRow
              rate={rate}
              key={rate.id}
              refetchShippingRate={refetch}
            />
          ))}
        </tbody>
      </table>
    </FadeInOut>
  );
}

export default ShippingTable;
