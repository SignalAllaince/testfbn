import Heading from "@/components/heading";
import { ProductDetailsRes } from "@/types/api.types";
import Image from "next/image";

function ProductDescription({
  productDetails,
  category,
}: {
  productDetails: ProductDetailsRes;
  category: string;
}) {
  return (
    <div className="w-full rounded-[4px] bg-[#F5F8FA] px-4 py-6 text-md text-obs-blue">
      <Heading size="h5" className="pb-4">
        Product Description
      </Heading>
      <div className="flex items-start justify-between">
        <div className="space-y-5 font-light">
          <div className="space-y-1">
            <p className="font-medium">Product Name</p>
            <p>{productDetails.name}</p>
          </div>

          <div className="flex items-center space-x-6">
            <div className="space-y-1">
              <p className="font-medium">Product Category</p>
              <p>{category}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div>
              <p className="font-medium">Unit Price</p>
              <p>{productDetails?.price}</p>
            </div>

            <div>
              <p className="font-medium">Quantity</p>
              <p>{productDetails?.stockQuantity} Remaining</p>
            </div>
          </div>
        </div>

        <div className="-mt-10 min-w-[300px] space-y-1">
          <p className="font-medium">Product Images</p>
          <div className="grid w-fit grid-cols-2 gap-4">
            {productDetails?.productImages?.map((pic, index) => (
              <div className="aspect-h-7 aspect-w-7 h-16 w-20" key={index}>
                <Image src={pic} width={80} height={80} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
