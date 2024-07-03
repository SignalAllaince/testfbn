import FadeInOut from "@/components/fade";
import Heading from "@/components/heading";
import IfElse from "@/components/if-else";
import useGetProduct from "@/hooks/products/useGetProduct";
import { AnimatePresence } from "framer-motion";
import Modal from "..";
import DiscountSettings from "./components/discount-settings";
import ProductDescription from "./components/product-desc";

function ApplyDiscountModal({
  isOpen,
  onClose,
  productId,
  category,
}: {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  productId: string | number;
  category: string;
}) {
  const getProduct = useGetProduct(productId);
  return (
    <Modal
      isOpen={isOpen}
      closeModal={onClose}
      closeOnOverlayClick
      size="large"
      title={
        <Heading size="h4" className="ml-8">
          Create Coupon
        </Heading>
      }
    >
      <AnimatePresence>
        <IfElse
          ifOn={!getProduct.isLoading && !!getProduct?.value}
          ifOnElse={getProduct.isLoading && !getProduct?.value}
          onElse={
            <FadeInOut className="space-y-8 py-3 md:px-5">
              <div className="h-[300px] w-full animate-pulse bg-slate-200"></div>
              <div className="grid grid-cols-2 gap-5">
                <div className="h-[200px] w-full animate-pulse bg-slate-200"></div>
                <div className="h-[200px] w-full animate-pulse bg-slate-200"></div>
              </div>
              <div className="h-[300px] w-full animate-pulse bg-slate-200"></div>
            </FadeInOut>
          }
        >
          <FadeInOut className="space-y-8 py-3 md:px-5">
            <div className="space-y-8 py-6 md:px-5">
              <ProductDescription
                category={category}
                productDetails={getProduct?.value!}
              />
              <DiscountSettings
                onClose={onClose}
                productDetails={getProduct?.value!}
              />
            </div>
          </FadeInOut>
        </IfElse>
      </AnimatePresence>
    </Modal>
  );
}

export default ApplyDiscountModal;
