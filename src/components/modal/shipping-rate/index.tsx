import Button from "@/components/button";
import Heading from "@/components/heading";
import CustomInput from "@/components/input";
import CustomSelect from "@/components/input/select";
import Textarea from "@/components/input/text-area";
import useCreateCategory from "@/hooks/category/useCreateCategory";
import useGetShippingState from "@/hooks/shipping-rate/useGetShippingStates";
import { replaceMultiSpace, stripString } from "@/lib/utils/common.utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Modal from "..";

type Inputs = {
  description: string;
  name: string;
  state: string;
  shippingPrice: string;
};

export const categorySchema = yup.object({
  name: yup.string().required("product name is required").trim(),
  description: yup.string().required("description is required").trim(),
  state: yup.string().required("description is required").trim(),
  shippingPrice: yup
    .string()
    .required("price is required")
    .matches(
      /^((\\+[1-9][\\-]*)|(\\([0-9]\\)[\\-]*)|([0-9])[\\]*)*?[0-9]?[\\]*[0-9]?$/,
      "Price is not valid"
    )
    .trim(),
});

function CreateShippingRateModal({
  isOpen,
  onClose,
  refetch,
}: {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}) {
  const createCagetory = useCreateCategory();
  const shippingStates = useGetShippingState();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(categorySchema),
  });

  const createCagetoryHandler: SubmitHandler<Inputs> = (data) => {
    createCagetory
      .mutateAsync({
        ...data,
        slug: replaceMultiSpace(stripString(data.name)),
        icon: "string",
        status: 1,
        includeInSearch: true,
        thumbnailImage: "string",
        primaryImage: "string",
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
          Create Category
        </Heading>
      }
    >
      <div className="space-y-8 py-6">
        <form
          className="space-y-4"
          onSubmit={handleSubmit(createCagetoryHandler)}
        >
          <CustomInput
            {...register("name", { required: true })}
            errors={errors}
            bg="bg-brand-lightest"
            label="name"
            placeholder="Clothing"
          />
          <CustomSelect
            {...register("state", { required: true })}
            errors={errors}
            bg="bg-brand-lightest"
            label="State"
            placeholder="08000000000"
            isLoading={shippingStates.isLoading}
            // @ts-expect-error
            options={shippingStates?.value?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
          <CustomInput
            name="tip"
            isDisabled
            label="Slug"
            value={`${
              watch("name") ? replaceMultiSpace(stripString(watch("name"))) : ""
            }`}
            placeholder="slug"
          />
          <Textarea
            {...register("description", { required: true })}
            errors={errors}
            bg="bg-brand-lightest"
            label="Description"
            placeholder="Plain white shirt"
          />

          <div className="pt-4">
            <Button
              className="w-full uppercase"
              type="submit"
              isLoading={createCagetory.isLoading}
            >
              Create category
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default CreateShippingRateModal;
