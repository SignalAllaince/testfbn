import Button from "@/components/button";
import Icon from "@/components/icon";
import CustomInput from "@/components/input";
import CustomMultiSelect from "@/components/input/multi-select";
import CustomSelect from "@/components/input/select";
import Textarea from "@/components/input/text-area";
import CreateCategoryModal from "@/components/modal/create-category";
import useGetCategoryList from "@/hooks/category/useGetCategoryList";
import useUploadmedia from "@/hooks/media/useUploadMedia";
import useUpdateProduct from "@/hooks/products/useUpdateProduct";
import useGetActiveTaxClass from "@/hooks/taxclass/useGetActiveTaxClass";
import useDisclosure from "@/hooks/use-disclosure";
import useNotification from "@/hooks/use-notification";
import {
  replaceMultiSpace,
  stripString,
  truncateWord,
} from "@/lib/utils/common.utils";
import { splitCategory } from "@/lib/utils/component.utils";
import { ProductDetailsRes } from "@/types/api.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";
import { productSchema } from "../add-product";
import ImageUpload from "../add-product/image-upload";

type Inputs = {
  name: string;
  price: string;
  description: string;
  quantity: string;
  category: string;
  taxClassId: number;
};

const EditMainSection = ({ product }: { product: ProductDetailsRes }) => {
  const router = useRouter();
  const { toast } = useNotification();
  const [selectedImages, setSelectedImages] = React.useState<any[]>(
    product.productImages.map((item) => ({
      url: item,
      thumbnailUrl: item,
    }))
  );
  const renderedImages = React.useMemo(() => selectedImages, [selectedImages]);
  const getCatoryList = useGetCategoryList();
  const activeTaxClass = useGetActiveTaxClass();
  const updateProduct = useUpdateProduct();
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
    defaultValues: {
      category: product.categoryIds.join(","),
      description: product.description,
      name: product.name,
      price: product.price as unknown as string,
      quantity: product.stockQuantity as string,
      taxClassId: product.taxClassId!,
    },
  });

  const updateProductHandler: SubmitHandler<Inputs> = (data) => {
    const picsData = new FormData();

    if (selectedImages.length === 0) {
      toast({
        appearance: "error",
        description: `Select at least 1 product image`,
      });
      return;
    }
    const filePics = selectedImages.filter((item) => !item?.url);
    const urlPics = selectedImages
      .filter((item) => !!item?.url)
      .map((pic) => pic.url);
    filePics.forEach((pic) => {
      picsData.append("Files", pic as unknown as File);
    });

    if (filePics.length === 0) {
      updateProduct
        .mutateAsync({
          ...product,
          price: data.price,
          slug: replaceMultiSpace(data.name),
          oldPrice: data.price,
          name: data.name,
          shortDescription: truncateWord(data.description, 130),
          description: data.description,
          isFeatured: true,
          isAllowToOrder: true,
          isVisibleIndividually: true,
          categoryIds: splitCategory(data.category),
          taxClassId: data.taxClassId,
          stockQuantity: data.quantity,
          thumbnailImage: urlPics[0],
          productImages: urlPics,
        })
        .then((res) => {
          if ([200, 201].includes(+res.status)) {
            toast({
              appearance: "success",
              description: `Product updated successfully`,
            });
            router.push("/inventory");
          }
        })
        .catch((err) => console.log(err));
      return;
    }
    uploadMedia
      .mutateAsync(picsData)
      .then((res) => {
        updateProduct
          .mutateAsync({
            ...product,
            price: data.price,
            slug: replaceMultiSpace(data.name),
            oldPrice: data.price,
            specialPrice: data.price,
            name: data.name,
            shortDescription: truncateWord(data.description, 130),
            description: data.description,
            isFeatured: true,
            isAllowToOrder: true,
            isVisibleIndividually: true,
            categoryIds: splitCategory(data.category),
            taxClassId: data.taxClassId,
            stockQuantity: data.quantity,
            thumbnailImage: res?.data?.data[0],
            productImages: res?.data?.data
              ? // eslint-disable-next-line no-unsafe-optional-chaining
                [...urlPics, ...res?.data?.data!]
              : [],
          })
          .then((res) => {
            if ([200, 201].includes(+res.status)) {
              toast({
                appearance: "success",
                description: `Product update successfully`,
              });
              router.push("/inventory");
            }
          })
          .catch((err) => console.log(err));
      })
      .catch(console.log);
  };

  const defaultCategories = getCatoryList?.value
    ?.filter((item) => product.categoryIds.includes(+item.id))
    ?.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  console.log(product, "activeTaxClass");
  return (
    <div className="space-y-4">
      <p className="pl-4 text-lg">Description</p>
      <form
        className="grid grid-cols-1 gap-10 px-4 lg:grid-cols-2"
        onSubmit={handleSubmit(updateProductHandler)}
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
            h="min-h-[200px]"
            placeholder="Eg, Nadaam shirts"
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
              defaultValue={defaultCategories}
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
                onClick={onOpen}
                size="xs"
                className="rounded"
                leftIcon={<Icon IconComp={MdPlaylistAdd} />}
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
              isLoading={updateProduct.isLoading || uploadMedia.isLoading}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="sticky top-32 order-1 lg:order-2">
          <ImageUpload
            setSelectedImages={setSelectedImages}
            renderedImages={renderedImages}
          />
        </div>
      </form>

      {/* table */}
      <CreateCategoryModal
        refetch={getCatoryList.refetch}
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
};

export default EditMainSection;
