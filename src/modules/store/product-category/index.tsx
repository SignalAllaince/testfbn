import Button from "@/components/button";
import Icon from "@/components/icon";
import CreateTaxClass from "@/components/modal/create-taxclass";
import useGetCategoryList from "@/hooks/category/useGetCategoryList";
import useGetTaxClassList from "@/hooks/taxclass/useGetTaxClassList";
import useDisclosure from "@/hooks/use-disclosure";
import Layout from "@/layout/admin-layout";
import TaxShippingLayout from "@/layout/tax-layout";
import { NextPageWithLayout } from "@/types/component.types";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline";
import { AnimatePresence } from "framer-motion";
import React from "react";

const ProductCategory: NextPageWithLayout = () => {
  const taxClasses = useGetTaxClassList();
  const { isOpen, onClose } = useDisclosure();
  const categoryList = useGetCategoryList();
  console.log(categoryList, "categoryList");
  return (
    <div className="mt-5 w-full bg-white px-6 py-6 pb-3">
      <AnimatePresence>
        {/* <IfElse
          ifOn={!taxClasses.isLoading && !!taxClasses?.value}
          ifOnElse={taxClasses.isLoading && !taxClasses?.value}
          onElse={
            <FadeInOut className="flex items-center justify-center bg-white py-32">
              <div className="">
                <BeatLoader
                  color="#003B65"
                  size={20}
                  loading={true}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            </FadeInOut>
          }
        >
          <IfElse
            ifOn={taxClasses?.value?.length! >= 1}
            ifOnElse={taxClasses?.value?.length === 0}
            onElse={
              <FadeInOut className="flex items-center justify-center bg-white py-20">
                <div className="space-y-5 ">
                  <div className="flex flex-col items-center">
                    <Heading size="h4">No Tax Class Yet!</Heading>
                    <p className="text-sm">
                      This would allow you set your Tax Class for your products
                    </p>
                  </div>
                  <Button onClick={onOpen} size="small" className="mx-auto">
                    CREATE TAX CLASS
                  </Button>
                </div>
              </FadeInOut>
            }
            elseThen={<ErrorMessage />}
          >
            <div className="max-w-3xl space-y-4 py-3 pb-10">
              <Heading size="h5">List of Tax classes</Heading>
              <div className="space-y-6">
                <div>
                  {taxClasses?.value?.map((taxClass) => (
                    <div
                      key={taxClass.id}
                      className="flex  items-center justify-between border-b py-2 text-sm"
                    >
                      <p>{taxClass.name}</p>
                      <div className="flex items-center gap-2">
                        <p>{taxClass.isActive}</p>
                        <div className="flex">
                          <Button size="xs" variant="minimenu">
                            <Icon
                              boxSize={4}
                              className="text-red-500"
                              IconComp={TrashIcon}
                            />
                          </Button>
                          <Button size="xs" variant="minimenu">
                            <Icon
                              boxSize={4}
                              className="text-brand-blue"
                              IconComp={PencilIcon}
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="">
                  <Button
                    onClick={onOpen}
                    size="xs"
                    className="ml-auto rounded-sm"
                  >
                    CREATE TAX CLASS
                  </Button>
                </div>
              </div>
            </div>
          </IfElse>
        </IfElse> */}

        <div className="flex flex-wrap gap-4">
          <Button variant="cart">Button</Button>
          <Button variant="outline">Button</Button>
          <Button variant="menu">Button</Button>
          <Button variant="secondary">Button</Button>
          <Button variant="secondary" size="small">
            Button
          </Button>
          <Button variant="warning">Button</Button>
          <Button variant="warning" size="small">
            Button
          </Button>
          <Button
            rightIcon={<Icon IconComp={ChevronDoubleDownIcon} />}
            leftIcon={<Icon IconComp={ChevronDoubleDownIcon} />}
            className="px-20"
          >
            Button
          </Button>
          <Button size="small" isLoading>
            Button
          </Button>
        </div>
      </AnimatePresence>
      <CreateTaxClass
        isOpen={isOpen}
        onClose={onClose}
        refetch={taxClasses.refetch}
      />
    </div>
  );
};
ProductCategory.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      <TaxShippingLayout>{page}</TaxShippingLayout>
    </Layout>
  );
};

export default ProductCategory;
