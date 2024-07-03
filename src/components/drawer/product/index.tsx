import Button from "@/components/button";
import FadeInOut from "@/components/fade";
import IfElse from "@/components/if-else";
import useGetProduct from "@/hooks/products/useGetProduct";
import { AnimatePresence } from "framer-motion";
import Drawer from "..";
import ProductDetails from "./main";

function ProductDetailsDrawer({
  isOpen,
  onClose,
  productId,
  category,
}: {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  category: string;
}) {
  const getProduct = useGetProduct(productId);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Product Details">
      <Drawer.Body>
        <AnimatePresence>
          <IfElse
            ifOn={!getProduct.isLoading && !!getProduct?.value}
            ifOnElse={getProduct.isLoading && !getProduct?.value}
            onElse={<FadeInOut className="space-y-8 py-6 md:px-5"></FadeInOut>}
          >
            <FadeInOut className="space-y-8 py-6 md:px-5">
              <ProductDetails
                category={category}
                product={getProduct?.value!}
              />
            </FadeInOut>
          </IfElse>
        </AnimatePresence>
      </Drawer.Body>
      <Drawer.Footer>
        <div className="w-full">
          <Button
            className="w-full text-sm uppercase"
            href={`/inventory/edit/${productId}`}
            // onClick={handleEditDetails}
          >
            edit details
          </Button>
        </div>
      </Drawer.Footer>
    </Drawer>
  );
}

export default ProductDetailsDrawer;
