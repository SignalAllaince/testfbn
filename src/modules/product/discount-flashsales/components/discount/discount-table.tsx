import EmptyProduct from "@/components/empty-products";
import ErrorMessage from "@/components/error-message";
import { rubik } from "@/components/fonts";
import IfElse from "@/components/if-else";
import TableLoader from "@/components/loader";
import { IItemSchema } from "@/types/api.types";
import { AnimatePresence } from "framer-motion";
import DiscountTableRow from "./discount-tablerow";

function DiscountTable({
  loading,
  products,
}: {
  loading: boolean;
  products: IItemSchema[];
}) {
  return (
    <div className="overflow-x-auto  sm:rounded-lg">
      <table className="w-full text-left text-sm text-brand-darkest">
        <thead
          className={`${rubik.className} border-b border-t bg-white text-md font-light capitalize text-brand-darkest`}
        >
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              Item Number
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Item Name
            </th>

            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              {" "}
            </th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            <IfElse
              ifOn={!loading && !!products}
              ifOnElse={loading && !products}
              onElse={<TableLoader />}
              elseThen={
                <tr>
                  <td colSpan={6}>
                    <ErrorMessage />
                  </td>
                </tr>
              }
            >
              <IfElse
                ifOn={products && products?.length > 0}
                ifOnElse={products && products?.length === 0}
                onElse={
                  <tr>
                    <td colSpan={6}>
                      <EmptyProduct />
                    </td>
                  </tr>
                }
              >
                <>
                  {products?.map((product) => (
                    <DiscountTableRow product={product} key={product.id} />
                  ))}
                </>
              </IfElse>
            </IfElse>
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}

export default DiscountTable;
