import Button from "@/components/button";
import ErrorMessage from "@/components/error-message";
import FadeInOut from "@/components/fade";
import Heading from "@/components/heading";
import IfElse from "@/components/if-else";
import CreateTaxClass from "@/components/modal/create-taxclass";
import useGetTaxClassList from "@/hooks/taxclass/useGetTaxClassList";
import useDisclosure from "@/hooks/use-disclosure";
import Layout from "@/layout/admin-layout";
import TaxShippingLayout from "@/layout/tax-layout";
import { NextPageWithLayout } from "@/types/component.types";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { BeatLoader } from "react-spinners";
import TaxClassRow from "./taxclass-row";

const ProductTaxClass: NextPageWithLayout = () => {
  const taxClasses = useGetTaxClassList();
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <div className="mt-5 w-full bg-white px-6 py-6 pb-3">
      <AnimatePresence>
        <IfElse
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
                    <TaxClassRow
                      taxClass={taxClass}
                      refetchTaxClass={taxClasses.refetch}
                      key={taxClass.id}
                    />
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
        </IfElse>
      </AnimatePresence>
      <CreateTaxClass
        isOpen={isOpen}
        onClose={onClose}
        refetch={taxClasses.refetch}
      />
    </div>
  );
};
ProductTaxClass.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      <TaxShippingLayout>{page}</TaxShippingLayout>
    </Layout>
  );
};

export default ProductTaxClass;
