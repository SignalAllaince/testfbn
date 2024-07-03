import Button from "@/components/button";
import CustomInput from "@/components/input";
import CustomSelect from "@/components/input/select";
import Textarea from "@/components/input/text-area";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "..";

type Inputs = {
  address: string;
  phoneNumber: string;
  state: string;
};

function CheckoutAddressModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const setAddressHandler: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    router.push("/cart/checkout");
  };
  return (
    <Modal isOpen={isOpen} closeModal={onClose} size="md">
      <div className="space-y-8 py-6 md:px-5">
        <div className="text-md font-medium text-brand-darkest ">
          <p>
            Kindly provide the following details correctly in the fields below
            to continue
          </p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit(setAddressHandler)}>
          <CustomSelect
            {...register("state", { required: true })}
            errors={errors}
            bg="bg-brand-lightest"
            label="State"
            placeholder="08000000000"
            options={[
              { label: "King", value: "king" },
              { label: "Queen", value: "queen" },
              { label: "Price", value: "prince" },
            ]}
          />
          <Textarea
            {...register("address", { required: true })}
            errors={errors}
            bg="bg-brand-lightest"
            label="Delivery Address"
            placeholder="Plot 72, Unknown Estate, along Unknown Road, Unknown Town, Lagos State, Nigeria."
          />
          <CustomInput
            {...register("phoneNumber", { required: true })}
            errors={errors}
            bg="bg-brand-lightest"
            label="Phone Number"
            placeholder="08000000000"
          />
          <div className="pt-4">
            <Button className="w-full text-sm uppercase" type="submit">
              Continue
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default CheckoutAddressModal;
