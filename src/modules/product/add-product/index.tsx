import Button from "@/components/button";
import Header from "@/components/dashboardComponents/Header";
import Icon from "@/components/icon";
import CustomInput from "@/components/input";
import CustomMultiSelect from "@/components/input/multi-select";
import CustomSelect from "@/components/input/select";
import Textarea from "@/components/input/text-area";
import CreateCategoryModal from "@/components/modal/create-category";
import Section from "@/components/section";
import useGetCategoryList from "@/hooks/category/useGetCategoryList";
import useUploadmedia from "@/hooks/media/useUploadMedia";
import useCreateProduct from "@/hooks/products/useCreateProduct";
import useGetActiveTaxClass from "@/hooks/taxclass/useGetActiveTaxClass";
import useDisclosure from "@/hooks/use-disclosure";
import useNotification from "@/hooks/use-notification";
import Layout from "@/layout/admin-layout";
import { replaceMultiSpace, stripString } from "@/lib/utils/common.utils";
import { splitCategory } from "@/lib/utils/component.utils";
import { NextPageWithLayout } from "@/types/component.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";
import * as yup from "yup";
import ImageUpload from "./image-upload";

type Inputs = {
  name: string;
  price: string;
  description: string;
  quantity: string;
  category: string;
  taxClassId: number;
};

export const productSchema = yup.object({
  name: yup
    .string()
    .required("product name is required")
    .matches(/^[A-Za-z0-9 ]+$/, "must not contain special characters")
    .trim(),
  price: yup
    .string()
    .required("price is required")
    .matches(
      /^((\\+[1-9][\\-]*)|(\\([0-9]\\)[\\-]*)|([0-9])[\\]*)*?[0-9]?[\\]*[0-9]?$/,
      "Price is not valid"
    )
    .trim(),
  description: yup.string().required("description is required").trim(),
  quantity: yup
    .string()
    .required("quantity is required")
    .matches(
      /^((\\+[1-9][\\-]*)|(\\([0-9]\\)[\\-]*)|([0-9])[\\]*)*?[0-9]?[\\]*[0-9]?$/,
      "quantity is not valid"
    )
    .trim(),
  category: yup.string().required("Required field"),
  taxClassId: yup.number().required("Required field"),
});

const AddProductPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { toast } = useNotification();
  const [selectedImages, setSelectedImages] = React.useState<File[]>([]);
  const renderedImages = React.useMemo(() => selectedImages, [selectedImages]);

  const getCatoryList = useGetCategoryList();
  const activeTaxClass = useGetActiveTaxClass();
  const createProduct = useCreateProduct();
  const uploadMedia = useUploadmedia();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(productSchema),
  });

  const createProductHandler: SubmitHandler<Inputs> = (data) => {
    const picsData = new FormData();
    if (selectedImages.length === 0) {
      toast({
        appearance: "error",
        description: `Select at least 1 product image`,
      });
      return;
    }
    selectedImages.forEach((pic) => {
      picsData.append("Files", pic);
    });

    uploadMedia
      .mutateAsync(picsData)
      .then((res) => {
        createProduct
          .mutateAsync({
            price: data.price,
            slug: replaceMultiSpace(stripString(data.name)),
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
            categoryIds: splitCategory(data.category),
            taxClassId: data.taxClassId,
            stockQuantity: data.quantity,
            thumbnailImage: res?.data?.data[0],
            productImages: res?.data?.data,
          })
          .then((res) => {
            if ([200, 201].includes(+res.status)) {
              toast({
                appearance: "success",
                description: `Product created successfully`,
              });
              router.push("/inventory");
            }
          })
          .catch((err) => console.log(err));
      })
      .catch(console.log);
  };

  return (
    <div className="relative w-full bg-white pb-3">
      <Header isPrev heading="Add New Product" />

      <Section className="sticky top-0 space-y-4 px-10 pb-10">
        <p className="pl-4 text-lg">Description</p>
        <form
          className="grid grid-cols-1 gap-10 px-4 lg:grid-cols-2"
          onSubmit={handleSubmit(createProductHandler)}
        >
          <div className="order-2 space-y-4 lg:order-1">
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
              value={replaceMultiSpace(stripString(watch("name")))}
              placeholder="slug"
            />
            <Textarea
              {...register("description")}
              errors={errors}
              label="Product Description"
              h="min-h-[120px]"
              placeholder="Eg, Gucci wears"
            />

            <div>
              <CustomMultiSelect
                {...register("category")}
                label="Product Category"
                errors={errors}
                setValue={setValue}
                value={watch("category")}
                placeholder="Product Category"
                name="category"
                isLoading={getCatoryList.isLoading}
                options={
                  getCatoryList?.value
                    ? getCatoryList?.value?.map((item) => ({
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
                <Button
                  size="small"
                  leftIcon={<Icon IconComp={MdPlaylistAdd} />}
                  onClick={onOpen}
                >
                  Add another category
                </Button>
              </div>
            </div>
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

            <CustomInput
              {...register("price")}
              errors={errors}
              label="Unit Price"
              placeholder="₦10,500"
            />
            <CustomInput
              {...register("quantity")}
              errors={errors}
              label="Quantity"
              placeholder="30"
            />
            <div className="pt-4">
              <Button
                className="w-full uppercase"
                type="submit"
                isLoading={createProduct.isLoading || uploadMedia.isLoading}
              >
                Save
              </Button>
            </div>
          </div>
          <ImageUpload
            setSelectedImages={setSelectedImages}
            renderedImages={renderedImages}
          />
        </form>
      </Section>
      <CreateCategoryModal
        refetch={getCatoryList.refetch}
        isOpen={isOpen}
        onClose={onClose}
      />
      {/* table */}
    </div>
  );
};

AddProductPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default AddProductPage;
