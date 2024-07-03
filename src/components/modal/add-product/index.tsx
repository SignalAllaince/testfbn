import Button from "@/components/button";
import Heading from "@/components/heading";
import Icon from "@/components/icon";
import CustomInput from "@/components/input";
import CustomSelect from "@/components/input/select";
import Textarea from "@/components/input/text-area";
import useGetCategoryList from "@/hooks/category/useGetCategoryList";
import useUploadmedia from "@/hooks/media/useUploadMedia";
import useCreateProduct from "@/hooks/products/useCreateProduct";
import useGetActiveTaxClass from "@/hooks/taxclass/useGetActiveTaxClass";
import useNotification from "@/hooks/use-notification";
import { replaceMultiSpace } from "@/lib/utils/common.utils";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";
import Modal from "..";

type Inputs = {
  name: string;
  description: string;
  category: string;
  taxClassId: string;
  quantity: string;
  price: string;
};

function AddProductModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // const categories = useGetCategoryList();
  const { toast } = useNotification();
  const [selectedImages, setSelectedImages] = React.useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const getCatoryList = useGetCategoryList();
  const activeTaxClass = useGetActiveTaxClass();
  const createProduct = useCreateProduct();
  const uploadMedia = useUploadmedia();

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
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const createProductHandler: SubmitHandler<Inputs> = (data) => {
    const picsData = new FormData();
    selectedImages.forEach((pic) => {
      picsData.append("Files", pic);
    });

    uploadMedia
      .mutateAsync(picsData)
      .then((res) => {
        createProduct
          .mutateAsync({
            price: data.price,
            slug: replaceMultiSpace(data.name),
            oldPrice: data.price,
            specialPrice: data.price,
            name: data.name,
            shortDescription: "string",
            description: data.description,
            specification: "string",
            status: 1,
            isFeatured: true,
            isAllowToOrder: true,
            isVisibleIndividually: true,
            categoryIds: [data.category],
            taxClassId: data.taxClassId,
            stockQuantity: data.quantity,
            thumbnailImage: res?.data?.data[0],
            productImages: res?.data?.data,
          })
          .catch((err) => console.log(err));
      })
      .catch(console.log);

    console.log(data);
  };

  return (
    <Modal isOpen={isOpen} closeModal={onClose} size="lg">
      <div className="space-y-4 py-3 md:px-5">
        <div className="text-md font-medium text-brand-darkest ">
          <Heading size="h3">Add new Product</Heading>
        </div>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(createProductHandler)}
        >
          <CustomInput
            {...register("name")}
            errors={errors}
            label="Product Name"
            placeholder="Macbook air"
          />
          <CustomInput
            name="tip"
            isDisabled
            label="Product Slug"
            value={`${watch("name") ? replaceMultiSpace(watch("name")) : ""}`}
            placeholder="slug"
          />

          <Textarea
            {...register("description")}
            errors={errors}
            label="Product Description"
            h="min-h-[120px]"
            placeholder="Plot 72, Unknown Estate, along Unknown Road, Unknown Town, Lagos State, Nigeria."
          />

          <CustomSelect
            {...register("category")}
            errors={errors}
            label="Product Category"
            placeholder="Electronics"
            isLoading={getCatoryList?.isLoading}
            options={
              getCatoryList?.value
                ? getCatoryList?.value?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : undefined
            }
          />

          <CustomSelect
            {...register("taxClassId")}
            errors={errors}
            label="Tax Class"
            placeholder="Standard VAT"
            isLoading={activeTaxClass?.isLoading}
            options={
              activeTaxClass?.value
                ? activeTaxClass?.value?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : undefined
            }
          />
          <div className="w-full">
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
                        className="h-4 w-4 rounded-full !bg-red-400 p-2 !text-white hover:!bg-red-500"
                      >
                        <Icon IconComp={XMarkIcon} boxSize={4} color="white" />
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
                  {...register("price")}
                  errors={errors}
                  label="Unit Price"
                  placeholder="₦10,500"
                />
              </div>

              {/* <div>
                <CustomInput
                  {...register("phoneNumber")}
                  errors={errors}
                  label="Net Weight (Kg)"
                  placeholder="2"
                />
              </div> */}

              <div>
                <CustomInput
                  {...register("quantity")}
                  errors={errors}
                  label="Quantity"
                  placeholder="30"
                />
              </div>
            </div>
          </div>
          <div className="pt-4">
            <Button
              className="w-full uppercase"
              type="submit"
              isLoading={createProduct.isLoading || uploadMedia.isLoading}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default AddProductModal;
