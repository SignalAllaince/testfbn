import BlurImage from "@/components/image";
import { OrderItem } from "@/types/api.types";

function OrderProductRow({ product }: { product: OrderItem }) {
  return (
    <>
      <div className="flex w-full items-start justify-between pb-4">
        <div className="item-start flex w-full  gap-3 text-[13px] font-light">
          <div className="flex h-[100px] w-[100px] flex-shrink-0 overflow-hidden rounded-[4px] bg-brand-light">
            {product?.productImage && (
              <BlurImage
                src={product?.productImage}
                // src={product?.productImage ? product?.productImage : productImg}
                alt="product image"
                width={400}
                height={400}
                className="h-full w-full object-cover object-center"
              />
            )}
          </div>
          <div className="flex w-full items-end justify-between">
            <div className="flex h-[100px] flex-col justify-between py-1">
              <p>{product?.productName}</p>
              <p className="text-xs">Quantity: {product?.quantity}</p>
              <p className="text-sm font-medium">{product?.totalString}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderProductRow;
