import Button from "@/components/button";
import Icon from "@/components/icon";
import FlashSaleModal from "@/components/modal/flash-sale";
import useDisclosure from "@/hooks/use-disclosure";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

function AddFlashSales() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <div className="bg-white px-6 py-8">
        <div className="w-full space-y-2">
          <div>
            <p>Selected Products</p>
            <div className="flex items-center space-x-2 pt-1 text-xs font-light text-brand-dark">
              <Icon IconComp={InformationCircleIcon} boxSize={4} />
              <p>
                Search for the product you wish to add to the Flash Sales and
                add them.
              </p>
            </div>
          </div>

          <div className="flex items-end justify-between gap-3">
            <p className="text-[11px] font-light text-red-600">
              No item selected
            </p>
            <Button size="small" onClick={onOpen}>
              Continue
            </Button>
          </div>
        </div>
      </div>
      <FlashSaleModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default AddFlashSales;
