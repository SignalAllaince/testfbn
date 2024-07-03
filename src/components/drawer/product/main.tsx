import BlurImage from "@/components/image";
import { ProductDetailsRes } from "@/types/api.types";

function ProductDetails({
  product,
  category,
}: {
  product: ProductDetailsRes;
  category: string;
}) {
  return (
    <div className="relative mb-1 rounded-[4px] bg-white font-light">
      <div className="mt-3">
        <p className="leadig-[22px] text-md font-medium text-obs-blue">
          Product Name
        </p>
        <p className="mt-2 text-md leading-[22px] text-obs-blue">
          {product.name}
        </p>
      </div>

      <div className="mt-6">
        <p className="leadig-[22px] text-md font-medium text-obs-blue">
          Product Description
        </p>
        <p className="mt-2 text-md leading-[22px] text-obs-blue">
          {product.description}
        </p>
        {/* <div className="pt-2 text-sm font-light">
          <p>Color - Black</p>
          <p>Pages - 200 pages</p>
          <p>Weight - 3kg</p>
        </div> */}
      </div>

      <div className="mt-6 flex max-w-md items-center justify-between">
        <div>
          <p className="mt-2 text-md font-medium leading-[22px] text-obs-blue">
            Product Category
          </p>
          <p className="text-md leading-[22px] text-obs-blue">{category}</p>
        </div>

        {/* <div>
          <p className="mt-2 text-md font-medium leading-[22px] text-obs-blue">
            Product Sub-Category
          </p>
          <p className="text-md leading-[22px] text-obs-blue">
            {product.categoryIds[0]}
          </p>
        </div> */}
      </div>

      <div className="mt-6 flex max-w-md items-center justify-between ">
        <div>
          <p className="mt-2 text-md font-medium leading-[22px] text-obs-blue">
            Unit Price
          </p>
          <p className="mt-1 text-md leading-[22px] text-obs-blue">
            {product.price}
          </p>
        </div>

        <div>
          <p className="mt-2 text-md font-medium leading-[22px] text-obs-blue">
            Net Weight (Kg)
          </p>
          <p className="mt-1 text-md leading-[22px] text-obs-blue">2</p>
        </div>

        <div>
          <p className="mt-2 text-md font-medium leading-[22px] text-obs-blue">
            Quantity
          </p>
          <p className="mt-1 text-md leading-[22px] text-obs-blue">
            {product.stockQuantity} Remaining
          </p>
        </div>
      </div>

      <div className="mt-6">
        <p className="mt-2 text-md font-medium leading-[22px] text-obs-blue">
          Product Images
        </p>
        <div className="justify mt-2 grid grid-cols-4 items-center gap-4">
          {product?.productImages?.map((img) => (
            <div key={img} className="aspect-h-8 aspect-w-7">
              <BlurImage
                src={img}
                className="h-full w-full object-cover"
                width={96}
                height={96}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
