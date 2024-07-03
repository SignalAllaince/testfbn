import EmptyProduct from "@/components/empty-products";
import ErrorMessage from "@/components/error-message";
import { rubik } from "@/components/fonts";
import IfElse from "@/components/if-else";
import { IItemSchema } from "@/types/api.types";
import { AnimatePresence, motion } from "framer-motion";
import { BeatLoader } from "react-spinners";
import InventoryTableRow from "./inventory-tablerow";

function InventoryTable({
  loading,
  products,
  refetchProducts,
}: {
  loading: boolean;
  products: IItemSchema[];
  refetchProducts: () => void;
}) {
  return (
    <>
      <div className="overflow-x-auto  sm:rounded-lg">
        <table className="w-full text-left text-sm text-brand-darkest">
          <thead
            className={`${rubik.className} border-b text-md capitalize text-gray-700`}
          >
            <tr>
              <th scope="col" className="min-w-[150px] px-6 py-4 font-bold">
                Image
              </th>
              <th scope="col" className="min-w-[250px] px-6 py-4 font-bold">
                Item details
              </th>
              <th scope="col" className="min-w-[150px] px-6 py-4 font-bold">
                Stock
              </th>
              <th scope="col" className="min-w-[150px] px-6 py-4 font-bold">
                Category
              </th>

              <th scope="col" className="min-w-[150px] px-6 py-4 font-bold">
                Date
              </th>
              <th scope="col" className=" px-6 py-4 font-medium">
                {" "}
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              <IfElse
                ifOn={!loading && !!products}
                ifOnElse={loading && !products}
                onElse={
                  <AnimatePresence>
                    <motion.tr
                      initial={{ opacity: 0.2 }}
                      exit={{ opacity: 0.2 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      className="bg-white"
                    >
                      <td colSpan={6} className="bg-red relative py-28">
                        <div className="absolute left-1/2 top-1/2">
                          <BeatLoader
                            color="#003B65"
                            size={20}
                            loading={true}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        </div>
                      </td>
                    </motion.tr>
                  </AnimatePresence>
                }
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
                    {products?.map((product, index) => (
                      <InventoryTableRow
                        product={product}
                        key={product.id}
                        refetchProducts={refetchProducts}
                        isLast={products.length === index + 1}
                      />
                    ))}
                  </>
                </IfElse>
              </IfElse>
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default InventoryTable;
