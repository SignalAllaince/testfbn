import Button from "@/components/button";
import ErrorMessage from "@/components/error-message";
import FadeInOut from "@/components/fade";
import Heading from "@/components/heading";
import IfElse from "@/components/if-else";
import CreateTaxRate from "@/components/modal/create-taxrate";
import useGetTaxRateList from "@/hooks/taxrate/useGetTaxRateList";
import useDisclosure from "@/hooks/use-disclosure";
import Layout from "@/layout/admin-layout";
import TaxShippingLayout from "@/layout/tax-layout";
import { NextPageWithLayout } from "@/types/component.types";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { BeatLoader } from "react-spinners";
import TaxRateRow from "./taxrate-row";
import TaxRateTable from "./taxrate-table";

const ProductTaxRate: NextPageWithLayout = () => {
  const taxRates = useGetTaxRateList();
  const { isOpen, onClose, onOpen } = useDisclosure();
  console.log(taxRates?.value);
  return (
    <div className="mt-5 w-full bg-white px-6 py-6 pb-3">
      <AnimatePresence>
        <IfElse
          ifOn={!taxRates.isLoading && !!taxRates?.value}
          ifOnElse={taxRates.isLoading && !taxRates?.value}
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
            ifOn={taxRates?.value?.length! >= 1}
            ifOnElse={taxRates?.value?.length === 0}
            onElse={
              <FadeInOut className="flex items-center justify-center bg-white py-20">
                <div className="space-y-5 ">
                  <div className="flex flex-col items-center">
                    <Heading size="h4">No Tax Rate Yet!</Heading>
                    <p className="text-sm">
                      This would allow you set your Tax Rate for your products
                    </p>
                  </div>
                  <Button onClick={onOpen} size="small" className="mx-auto">
                    CREATE TAX RATE
                  </Button>
                </div>
              </FadeInOut>
            }
            elseThen={<ErrorMessage />}
          >
            <div className="max-w-5xl space-y-6 py-3 pb-10">
              <Heading size="h5">List of Tax Rates</Heading>
              <div className="space-y-6">
                <TaxRateTable>
                  {taxRates?.value?.map((taxRate) => (
                    <TaxRateRow
                      key={taxRate.id}
                      taxRate={taxRate}
                      refetchTaxRate={taxRates.refetch}
                    />
                  ))}
                </TaxRateTable>

                <div className="">
                  <Button
                    onClick={onOpen}
                    size="xs"
                    className="ml-auto rounded-sm"
                  >
                    CREATE TAX RATE
                  </Button>
                </div>
              </div>
            </div>
          </IfElse>
        </IfElse>
      </AnimatePresence>
      <CreateTaxRate
        isOpen={isOpen}
        onClose={onClose}
        refetch={taxRates.refetch}
      />
    </div>
  );
};
ProductTaxRate.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      <TaxShippingLayout>{page}</TaxShippingLayout>
    </Layout>
  );
};

export default ProductTaxRate;
