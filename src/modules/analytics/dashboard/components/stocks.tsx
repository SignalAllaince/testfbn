import Button from "@/components/button";
import Icon from "@/components/icon";
import { IItemSchema } from "@/types/api.types";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

export default function Stocks({ products }: { products: IItemSchema[] }) {
  return (
    <div className="w-full rounded-[4px] bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-md font-medium leading-[22px] text-obs-blue">
          Low Stock Items
        </h2>
        <Button
          variant="secondary"
          size="xs"
          className="!h-7 !px-3 !text-[11px]"
          leftIcon={<Icon IconComp={ArrowUpOnSquareIcon} boxSize={4} />}
        >
          Export All
        </Button>
      </div>

      <div className="profile-grid mt-6 grid gap-5">
        {products?.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-start gap-2 font-light"
          >
            <div className="h-9 w-9 rounded-[4px] bg-btn-light"></div>
            <div>
              <p className="text-sm leading-[14.52px] text-obs-blue">
                {item.name}
              </p>
              <p className="mt-1 text-sm leading-[14.52px] text-error-100">
                {item.stockQuantity} Remaining
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
