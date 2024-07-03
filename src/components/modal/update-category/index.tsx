import Button from "@/components/button";
import Heading from "@/components/heading";
import CustomInput from "@/components/input";
import IconCustomMultiSelect from "@/components/input/icon-select";
import CustomSelect from "@/components/input/select";
import Textarea from "@/components/input/text-area";
import useUpdateCategory from "@/hooks/category/useUpdateCategory";
import { replaceMultiSpace, stripString } from "@/lib/utils/common.utils";
import { categoryIcons } from "@/lib/utils/component.utils";
import { ICategoryType } from "@/types/api.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Modal from "..";

type Inputs = {
  description: string | undefined;
  name: string;
  icon: string;
  status: string;
};

export const categorySchema = yup.object({
  name: yup.string().required("product name is required").trim(),
  description: yup.string().trim(),
  icon: yup.string().required("icon is required").trim(),
  status: yup.string().required("status is required"),
});

function UpdateCategoryModal({
  isOpen,
  onClose,
  refetch,
  defaultValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  defaultValues: ICategoryType;
}) {
  const updateCategory = useUpdateCategory();
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
      icon: defaultValues?.icon,
      name: defaultValues?.name,
      description: defaultValues?.description,
      //   @ts-expect-error
      status: defaultValues?.status! === 0 ? "Inactive" : "Active",
    },
  });

  const updateCategoryHandler: SubmitHandler<Inputs> = (data) => {
    updateCategory
      .mutateAsync({
        ...defaultValues,
        ...data,
        slug: replaceMultiSpace(stripString(data.name)),
        status: data.status === "Active" ? 1 : 0,
      })
      .then(() => {
        refetch();
        reset();
        onClose();
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
          Update Category
        </Heading>
      }
    >
      <div className="space-y-8 py-6">
        <form
          className="space-y-4"
          onSubmit={handleSubmit(updateCategoryHandler)}
        >
          <IconCustomMultiSelect
            {...register("icon")}
            label="Category icon"
            errors={errors}
            setValue={setValue}
            value={watch("icon")}
            placeholder="Category icon"
            defaultValue={categoryIcons.find(
              (item) => item.value === defaultValues?.icon
            )}
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
          <CustomSelect
            {...register("status")}
            errors={errors}
            label="Status"
            placeholder="Select Status"
            options={[
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ]}
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
              isLoading={updateCategory.isLoading}
            >
              Update category
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default UpdateCategoryModal;
