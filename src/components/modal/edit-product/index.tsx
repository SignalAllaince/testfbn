import Button from "@/components/button";
import Heading from "@/components/heading";
import Icon from "@/components/icon";
import CustomInput from "@/components/input";
import CustomSelect from "@/components/input/select";
import Textarea from "@/components/input/text-area";
import useNotification from "@/hooks/use-notification";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";
import Modal from "..";

type Inputs = {
  address: string;
  phoneNumber: string;
  state: string;
};

function EditProductModal({
  isOpen,
  onClose,
  productId,
}: {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
}) {
  const { toast } = useNotification();
  const router = useRouter();
  const [selectedImages, setSelectedImages] = React.useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedFiles = Array.from(files) as File[];
      if (selectedImages.length + selectedFiles.length <= 4) {
        setSelectedImages((prevImages) => [...prevImages, ...selectedFiles]);
      } else {
        // Handle error or display a message that the limit has been reached
        toast({
          appearance: "error",
          description: `Maximum limit of four images reached`,
        });
      }
    }
  };

  const handleDeleteImage = (imgIndex: number) => {
    const newImgList = selectedImages.filter(
      (img, index) => index !== imgIndex
    );
    setSelectedImages(newImgList);
  };

  const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
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
    <Modal isOpen={isOpen} closeModal={onClose} size="lg">
      <div className="space-y-4 py-3 md:px-5">
        <div className="text-md font-medium text-brand-darkest ">
          <Heading size="h3">Edit Product Details</Heading>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(setAddressHandler)}>
          <CustomInput
            {...register("phoneNumber", { required: true })}
            errors={errors}
            label="Product Name"
            placeholder="08000000000"
          />
          <Textarea
            {...register("address", { required: true })}
            errors={errors}
            label="Product Description"
            h="min-h-[120px]"
            placeholder="Plot 72, Unknown Estate, along Unknown Road, Unknown Town, Lagos State, Nigeria."
          />

          <CustomSelect
            {...register("state", { required: true })}
            errors={errors}
            label="Product Category"
            placeholder="08000000000"
            options={[
              { label: "King", value: "king" },
              { label: "Queen", value: "queen" },
              { label: "Price", value: "prince" },
            ]}
          />
          <div className="w-full">
            <CustomSelect
              {...register("state", { required: true })}
              errors={errors}
              label="Product Sub-Category"
              placeholder="08000000000"
              options={[
                { label: "King", value: "king" },
                { label: "Queen", value: "queen" },
                { label: "Price", value: "prince" },
              ]}
            />
            <div className="mt-2 flex items-start justify-start gap-2 rounded-[4px] bg-[#F5F8FA] p-2 text-[0.5rem] leading-[10px] text-obs-blue">
              <AiOutlineInfoCircle size={17} />
              <p className="text-xs leading-[10px] text-obs-blue">
                If the product appears in more than one category, kindly add
                another category, and fill in those details.
              </p>
            </div>
          </div>
          <div className="mx-auto mt-5 flex items-center justify-end">
            <button className="left-4 flex w-44 items-center justify-start gap-1 rounded-[5px] bg-btn-blue px-2 py-2 text-sm font-medium text-white">
              <MdPlaylistAdd size={20} />
              <p>Add another category</p>
            </button>
          </div>

          <div className="mx-auto mt-7 border-t border-[#DAE8F2] pt-6">
            <h2>Images & Inventory</h2>
            <p className="mt-6 text-md font-medium leading-[22px]">
              Product Image
            </p>
            <div className="hide-scroll-bar flex items-center justify-start gap-2 overflow-x-scroll rounded-[4px] border border-[#DAE8F2] p-2">
              <div className="relative flex h-28 w-28 flex-col items-center justify-center bg-[#F5F8FA] px-2 pb-6">
                <input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  multiple
                  className="invisible relative z-10 mt-6"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                />
                <div className="pb-1 text-center">
                  <Icon
                    IconComp={PhotoIcon}
                    boxSize={10}
                    className="text-gray-300"
                  />
                </div>

                <label
                  className="flex w-full cursor-pointer justify-center rounded bg-btn-blue px-2 py-1 text-xs text-white"
                  onClick={handleLabelClick}
                >
                  Click to upload
                </label>
              </div>

              <div className="flex items-center">
                {selectedImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative ml-1 h-28 w-28 rounded-md"
                  >
                    <div className="absolute -right-1 -top-1">
                      <Button
                        onClick={() => handleDeleteImage(index)}
                        variant="outline"
                        className="h-4 w-4 rounded-full !bg-red-400 p-1 !text-white hover:!bg-red-500"
                      >
                        <Icon IconComp={XMarkIcon} boxSize={3} />
                      </Button>
                    </div>
                    <Image
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="h-28 w-28 rounded-md object-cover"
                      width="200"
                      height="200"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mx-auto mt-2 flex items-start justify-start gap-2 rounded-[4px] bg-[#F5F8FA] p-2 text-[0.5rem] leading-[10px] text-obs-blue">
              <AiOutlineInfoCircle size={20} />
              <p className="text-[0.5rem] leading-[10px] text-obs-blue">
                Ensure the images are clear images of the product that do not
                exceed 5MB, and are one of JPG or PNG. You can upload up to 4
                images.
              </p>
            </div>

            <div className="mx-auto mt-4 flex items-center justify-between gap-x-5">
              <div>
                <CustomInput
                  {...register("phoneNumber", { required: true })}
                  errors={errors}
                  label="Unit Price"
                  placeholder="₦10,500"
                />
              </div>

              <div>
                <CustomInput
                  {...register("phoneNumber", { required: true })}
                  errors={errors}
                  label="Net Weight (Kg)"
                  placeholder="2"
                />
              </div>

              <div>
                <CustomInput
                  {...register("phoneNumber", { required: true })}
                  errors={errors}
                  label="Quantity"
                  placeholder="30"
                />
              </div>
            </div>
          </div>
          <div className="pt-4">
            <Button className="w-full uppercase" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default EditProductModal;
