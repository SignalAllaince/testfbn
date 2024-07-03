import Button from "@/components/button";
import Heading from "@/components/heading";
import CustomInput from "@/components/input";
import CustomSelect from "@/components/input/select";
import useCreateShippingRate from "@/hooks/shipping-rate/useCreateShippingRate";
import useUpdateShippingRate from "@/hooks/shipping-rate/useUpdateShippingRate";
import useGetStatesList from "@/hooks/state/useGetStatesList";
import useGetActiveTaxClass from "@/hooks/taxclass/useGetActiveTaxClass";
import { RateItem } from "@/types/api.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Modal from "..";

type Inputs = {
  ShippingPrice: string;
  TaxClassId: string;
  MinOrderSubtotal: string;
  StateId: string;
  Name: string;
};

const shippingRateSchema = yup.object({
  Name: yup.string().required("tax class name is required").trim(),
  ShippingPrice: yup
    .string()
    .required("Shipping price is required")
    .matches(
      /^((\\+[1-9][\\-]*)|(\\([0-9]\\)[\\-]*)|([0-9])[\\]*)*?[0-9]?[\\]*[0-9]?$/,
      "Shipping price is not valid"
    )
    .trim(),
  MinOrderSubtotal: yup
    .string()
    .required("Min order sub total is required")
    .matches(
      /^((\\+[1-9][\\-]*)|(\\([0-9]\\)[\\-]*)|([0-9])[\\]*)*?[0-9]?[\\]*[0-9]?$/,
      "Min order sub total is not valid"
    )
    .trim(),
  TaxClassId: yup.string().required("Required field"),
  StateId: yup.string().required("Required field"),
});

function CreateShippingRate({
  isOpen,
  onClose,
  refetch,
  defaultValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  defaultValues?: RateItem;
}) {
  const createShippingRate = useCreateShippingRate();
  const updateShippingRate = useUpdateShippingRate();
  const activeTaxClass = useGetActiveTaxClass();
  const stateList = useGetStatesList();

  const TaxClassId = defaultValues?.taxClass
    ? activeTaxClass?.value?.find(
        (taxClass) => taxClass.name === defaultValues?.taxClass
      )?.id
    : "";

  const toggleShippingRate = defaultValues
    ? updateShippingRate
    : createShippingRate;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(shippingRateSchema),
    defaultValues: {
      MinOrderSubtotal: defaultValues?.minOrderSubtotal,
      Name: defaultValues?.name,
      ShippingPrice: defaultValues?.shippingPrice,
      TaxClassId: TaxClassId,
      StateId: defaultValues?.stateOrProvinceName
        ? stateList?.value?.find(
            (state) => state.name === defaultValues?.stateOrProvinceName
          )?.id
        : "",
    },
  });

  const toggleShippingRateHandler: SubmitHandler<Inputs> = (data) => {
    const extraValues: any = {};
    if (defaultValues) extraValues.Id = defaultValues?.id;
    toggleShippingRate
      .mutateAsync({
        ...data,
        ...extraValues,
        ShippingProviderId: 1,
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
          {defaultValues ? "Edit" : "Add"} Shipping Rate
        </Heading>
      }
    >
      <div className="space-y-8 py-6">
        <form
          className="space-y-4"
          onSubmit={handleSubmit(toggleShippingRateHandler)}
        >
          <CustomInput
            {...register("Name")}
            errors={errors}
            bg="bg-brand-lightest"
            label="Name"
            placeholder="Name"
          />

          <CustomSelect
            {...register("TaxClassId")}
            errors={errors}
            label="Tax Class"
            placeholder="Select Tax Class"
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
            {...register("ShippingPrice")}
            errors={errors}
            bg="bg-brand-lightest"
            label="Shipping price (₦)"
            placeholder="Shipping price"
          />
          <CustomSelect
            {...register("StateId")}
            errors={errors}
            label="State"
            placeholder="Select State"
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
            {...register("MinOrderSubtotal")}
            errors={errors}
            bg="bg-brand-lightest"
            label="Minimum Order Sub-Total (₦)"
            placeholder="Minimum Order Sub-Total"
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
              className="w-full max-w-[260px] flex-shrink-0 text-sm uppercase"
              type="submit"
              isLoading={toggleShippingRate.isLoading}
            >
              {defaultValues ? "Edit" : "Create"} Shipping Rate
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default CreateShippingRate;
