import Button from "@/components/button";
import Icon from "@/components/icon";
import CreateTaxRate from "@/components/modal/create-taxrate";
import DeleteTaxRate from "@/components/modal/delete-taxrate";
import useDisclosure from "@/hooks/use-disclosure";
import { ITaxRateItem } from "@/types/api.types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

function TaxRateRow({
  taxRate,
  refetchTaxRate,
}: {
  taxRate: ITaxRateItem;
  refetchTaxRate: () => void;
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
          <p>{taxRate.taxClassName}</p>
        </td>

        <td scope="row" className="px-6 py-3">
          <p>{taxRate.stateName ?? "All states"}</p>
        </td>
        <td scope="row" className="px-6 py-3 text-center">
          {taxRate.rate}
        </td>

        <td scope="row" className="px-6 py-3 text-center">
          <p>{taxRate.zipCode}</p>
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

      {isEditOpen && (
        <CreateTaxRate
          isOpen={isEditOpen}
          onClose={onEditClose}
          refetch={refetchTaxRate}
          defaultValues={taxRate}
        />
      )}
      <DeleteTaxRate
        isOpen={isOpen}
        onClose={onClose}
        refetch={refetchTaxRate}
        taxRateId={taxRate.id}
      />
    </>
  );
}

export default TaxRateRow;
