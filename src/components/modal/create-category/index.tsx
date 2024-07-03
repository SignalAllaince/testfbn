import Button from "@/components/button";
import Heading from "@/components/heading";
import CustomInput from "@/components/input";
import IconCustomMultiSelect from "@/components/input/icon-select";
import Textarea from "@/components/input/text-area";
import useCreateCategory from "@/hooks/category/useCreateCategory";
import { replaceMultiSpace, stripString } from "@/lib/utils/common.utils";
import { categoryIcons } from "@/lib/utils/component.utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Modal from "..";

type Inputs = {
  description: string;
  name: string;
  icon: string;
};

export const categorySchema = yup.object({
  name: yup.string().required("product name is required").trim(),
  description: yup.string().required("description is required").trim(),
  icon: yup.string().required("icon is required").trim(),
});

function CreateCategoryModal({
  isOpen,
  onClose,
  refetch,
}: {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}) {
  const createCagetory = useCreateCategory();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      icon: "Bike",
    },
  });

  const createCagetoryHandler: SubmitHandler<Inputs> = (data) => {
    createCagetory
      .mutateAsync({
        ...data,
        slug: replaceMultiSpace(stripString(data.name)),
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
          <IconCustomMultiSelect
            {...register("icon")}
            label="Category icon"
            errors={errors}
            setValue={setValue}
            value={watch("icon")}
            placeholder="Category icon"
            defaultValue={categoryIcons[1]}
            name="icon"
            options={categoryIcons}
          />
          <CustomInput
            {...register("name", { required: true })}
            errors={errors}
            bg="bg-brand-lightest"
            label="name"
            placeholder="Clothing"
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
              size="small"
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

export default CreateCategoryModal;
