import Button from "@/components/button";
import Heading from "@/components/heading";
import CustomInput from "@/components/input";
import CustomSelect from "@/components/input/select";
import useGetStatesList from "@/hooks/state/useGetStatesList";
import useGetActiveTaxClass from "@/hooks/taxclass/useGetActiveTaxClass";
import useCreateTaxRate from "@/hooks/taxrate/useCreateTaxRate";
import useUpdateTaxRate from "@/hooks/taxrate/useUpdateTaxRate";
import { ITaxRateItem } from "@/types/api.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Modal from "..";

type Inputs = {
  Rate: string;
  TaxClassId: string;
  ZipCode: string;
  StateId: string | undefined;
};

const taxRateSchema = yup.object({
  Rate: yup
    .string()
    .required("price is required")
    .matches(
      /^((\\+[1-9][\\-]*)|(\\([0-9]\\)[\\-]*)|([0-9])[\\]*)*?[0-9]?[\\]*[0-9]?$/,
      "Rate is not valid"
    )
    .trim(),
  ZipCode: yup
    .string()
    .required("price is required")
    .matches(/^\d{6}$/, "Zip code is not valid")
    .trim(),

  TaxClassId: yup.string().required("Tax class is not selected"),
  StateId: yup.string(),
});

function CreateTaxRate({
  isOpen,
  onClose,
  refetch,
  defaultValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  defaultValues?: ITaxRateItem;
}) {
  const activeTaxClass = useGetActiveTaxClass();
  const stateList = useGetStatesList();

  const TaxClassId = defaultValues?.taxClassName
    ? activeTaxClass?.value?.find(
        (taxClass) => taxClass.name === defaultValues?.taxClassName
      )?.id
    : "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(taxRateSchema),
    defaultValues: {
      Rate: defaultValues?.rate,
      StateId: defaultValues?.stateName
        ? stateList?.value?.find(
            (state) => state.name === defaultValues?.stateName
          )?.id
        : "",
      ZipCode: defaultValues?.zipCode,
      TaxClassId,
    },
  });

  const createTaxRate = useCreateTaxRate();
  const updateTaxRate = useUpdateTaxRate();

  const toggleTaxRate = defaultValues ? updateTaxRate : createTaxRate;

  const toggleTaxRateHandler: SubmitHandler<Inputs> = (data) => {
    const extraValues: any = {};
    if (defaultValues) extraValues.Id = defaultValues?.id;
    toggleTaxRate
      .mutateAsync({
        ...data,
        ...extraValues,
        StateId: data.StateId === "Select State" ? "" : data.StateId,
      })
      .then(() => {
        refetch();
        onClose();
        reset();
      })
      .catch(console.log);
  };

  return (
    <Modal
      isOpen={isOpen}
      closeModal={onClose}
      size="md"
      title={
        <Heading size="h5" className="pl-1">
          {defaultValues ? "Edit" : "Create"} Tax Rate
        </Heading>
      }
    >
      <div className="space-y-8 py-6">
        <form
          className="space-y-4"
          onSubmit={handleSubmit(toggleTaxRateHandler)}
        >
          <CustomSelect
            {...register("TaxClassId")}
            defaultValue={TaxClassId}
            errors={errors}
            label="Tax Class"
            placeholder="Select Tax Class"
            isLoading={activeTaxClass.isLoading}
            options={
              activeTaxClass?.value
                ? activeTaxClass?.value?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : undefined
            }
          />
          <CustomInput
            {...register("Rate")}
            errors={errors}
            bg="bg-brand-lightest"
            label="Rate (%)"
            placeholder="100"
          />
          <CustomSelect
            {...register("StateId")}
            errors={errors}
            label="State"
            placeholder="Select State"
            isLoading={stateList.isLoading}
            options={
              stateList?.value
                ? stateList?.value?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : undefined
            }
          />
          <CustomInput
            {...register("ZipCode")}
            errors={errors}
            bg="bg-brand-lightest"
            label="Zip code"
            placeholder="Zip code"
          />
          <div className="flex space-x-2 pt-4">
            <Button
              onClick={onClose}
              variant="secondary"
              className="w-full text-sm uppercase"
            >
              Cancel
            </Button>
            <Button
              className="w-full text-sm uppercase"
              type="submit"
              isLoading={toggleTaxRate.isLoading}
            >
              {defaultValues ? "update" : "Create"} Tax Rate
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default CreateTaxRate;
