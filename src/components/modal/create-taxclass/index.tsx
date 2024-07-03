import Button from "@/components/button";
import Heading from "@/components/heading";
import CustomInput from "@/components/input";
import CustomSelect from "@/components/input/select";
import useCreateTaxClass from "@/hooks/taxclass/useCreateTaxClass";
import useUpdateTaxClass from "@/hooks/taxclass/useUpdateTaxClass";
import { taxClassProps } from "@/types/api.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Modal from "..";

type Inputs = {
  Name: string;
  IsActive: boolean;
};

const taxClassSchema = yup.object({
  Name: yup.string().required("tax class name is required").trim(),
  IsActive: yup.boolean().required("status is required"),
});

function CreateTaxClass({
  isOpen,
  onClose,
  refetch,
  defaultValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  defaultValues?: taxClassProps;
}) {
  const createTaxClass = useCreateTaxClass();
  const updateTaxClass = useUpdateTaxClass();

  const toggleTaxClass = defaultValues ? updateTaxClass : createTaxClass;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(taxClassSchema),
    defaultValues: {
      Name: defaultValues?.name,
      IsActive: defaultValues?.isActive,
    },
  });

  const createTaxClassHandler: SubmitHandler<Inputs> = (data) => {
    const extraValues: any = {};
    if (defaultValues) extraValues.Id = defaultValues?.id;
    toggleTaxClass
      .mutateAsync({
        ...data,
        ...extraValues,
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
          {defaultValues ? "Edit" : "Create"} Tax Class
        </Heading>
      }
    >
      <div className="space-y-8 py-6">
        <form
          className="space-y-4"
          onSubmit={handleSubmit(createTaxClassHandler)}
        >
          <CustomInput
            {...register("Name")}
            errors={errors}
            bg="bg-brand-lightest"
            label="name"
            placeholder="Name"
          />

          <CustomSelect
            {...register("IsActive")}
            errors={errors}
            label="Status"
            placeholder="Select Status"
            options={[
              { label: "Active", value: true },
              { label: "Inactive", value: false },
            ]}
          />
          <div className="flex space-x-2 pt-6">
            <Button
              onClick={onClose}
              size="small"
              variant="secondary"
              className="w-full uppercase"
            >
              Cancel
            </Button>
            <Button
              size="small"
              className="w-full uppercase"
              type="submit"
              isLoading={toggleTaxClass.isLoading}
            >
              {defaultValues ? "Update" : "Create"} Tax Class
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default CreateTaxClass;
