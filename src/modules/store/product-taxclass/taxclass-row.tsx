import Button from "@/components/button";
import Icon from "@/components/icon";
import CreateTaxClass from "@/components/modal/create-taxclass";
import DeleteTaxClass from "@/components/modal/delete-taxclass";
import useDisclosure from "@/hooks/use-disclosure";
import { taxClassProps } from "@/types/api.types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

function TaxClassRow({
  taxClass,
  refetchTaxClass,
}: {
  taxClass: taxClassProps;
  refetchTaxClass: () => void;
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isDelOpen,
    onClose: onDelClose,
    onOpen: onDelOpen,
  } = useDisclosure();
  return (
    <>
      <div
        key={taxClass.id}
        className="flex  items-center justify-between border-b py-2 text-sm"
      >
        <p>{taxClass.name}</p>
        <div className="flex items-center gap-2">
          <p>{taxClass.isActive}</p>
          <div className="flex gap-2">
            {taxClass.isActive ? (
              <div className="grid place-items-center rounded-2xl bg-green-100 px-3 py-0 text-sm font-extrabold capitalize text-green-800">
                <span className="m-0 p-0">Active</span>
              </div>
            ) : (
              <div className="grid place-items-center rounded-2xl bg-red-100 px-3 py-0 text-sm font-extrabold capitalize text-red-700">
                <span className="m-0 p-0">Inactive</span>
              </div>
            )}
            <div className="flex">
              <Button size="xs" variant="minimenu" onClick={onDelOpen}>
                <Icon
                  boxSize={4}
                  className="text-red-500"
                  IconComp={TrashIcon}
                />
              </Button>
              <Button size="xs" onClick={onOpen} variant="minimenu">
                <Icon
                  boxSize={4}
                  className="text-brand-blue"
                  IconComp={PencilIcon}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CreateTaxClass
        isOpen={isOpen}
        onClose={onClose}
        refetch={refetchTaxClass}
        defaultValues={taxClass}
      />
      <DeleteTaxClass
        isOpen={isDelOpen}
        onClose={onDelClose}
        refetch={refetchTaxClass}
        taxClassId={taxClass.id}
      />
    </>
  );
}

export default TaxClassRow;
