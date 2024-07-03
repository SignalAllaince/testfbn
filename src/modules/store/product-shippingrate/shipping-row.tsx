import Button from "@/components/button";
import Icon from "@/components/icon";
import CreateShippingRate from "@/components/modal/create-shippingrate";
import DeleteShippingRate from "@/components/modal/delete-shippingrate";
import useDisclosure from "@/hooks/use-disclosure";
import { formatCurrency } from "@/lib/utils/common.utils";
import { RateItem } from "@/types/api.types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

function ShippingTableRow({
  rate,
  refetchShippingRate,
}: {
  rate: RateItem;
  refetchShippingRate: () => void;
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onClose: onEditClose,
    onOpen: onEditOpen,
  } = useDisclosure();
  return (
    <>
      <motion.tr
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="border-b bg-white text-brand-darkest hover:bg-gray-50"
      >
        <td scope="row" className="px-6 py-3">
          {rate.name}
        </td>
        <td scope="row" className="px-6 py-3">
          {rate.taxClass}
        </td>
        <td scope="row" className="px-6 py-3">
          {rate.providerName}
        </td>
        <td scope="row" className="px-6 py-3 text-center">
          {formatCurrency(rate.minOrderSubtotal)}
        </td>

        <td scope="row" className="px-6 py-3 text-center">
          {formatCurrency(rate.shippingPrice)}
        </td>
        <td scope="row" className="relative px-6 py-3">
          <div className="flex">
            <Button size="xs" variant="minimenu" onClick={onOpen}>
              <Icon boxSize={4} className="text-red-500" IconComp={TrashIcon} />
            </Button>
            <Button size="xs" variant="minimenu" onClick={onEditOpen}>
              <Icon
                boxSize={4}
                className="text-brand-blue"
                IconComp={PencilIcon}
              />
            </Button>
          </div>
        </td>
      </motion.tr>

      <DeleteShippingRate
        isOpen={isOpen}
        onClose={onClose}
        refetch={refetchShippingRate}
        shippingRateId={rate.id}
      />
      <CreateShippingRate
        isOpen={isEditOpen}
        onClose={onEditClose}
        refetch={refetchShippingRate}
        defaultValues={rate}
      />
    </>
  );
}

export default ShippingTableRow;
