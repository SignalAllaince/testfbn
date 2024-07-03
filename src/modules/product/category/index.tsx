import Button from "@/components/button";
import ErrorMessage from "@/components/error-message";
import FadeInOut from "@/components/fade";
import Heading from "@/components/heading";
import IfElse from "@/components/if-else";
import CreateCategoryModal from "@/components/modal/create-category";
import useGetCategoryList from "@/hooks/category/useGetCategoryList";
import useDisclosure from "@/hooks/use-disclosure";
import { AnimatePresence } from "framer-motion";
import { BeatLoader } from "react-spinners";
import CategoryTableRow from "./category-row";
import CategoryTable from "./category-table";

const CategorySection = () => {
  const categories = useGetCategoryList();
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <div className="w-full bg-white px-6 py-6">
      <AnimatePresence>
        <IfElse
          ifOn={!categories.isLoading && !!categories?.value}
          ifOnElse={categories.isLoading && !categories?.value}
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
          elseThen={<ErrorMessage />}
        >
          <IfElse
            ifOn={categories?.value?.length! >= 1}
            ifOnElse={categories?.value?.length === 0}
            onElse={
              <FadeInOut className="flex items-center justify-center bg-white py-20">
                <div className="space-y-5 ">
                  <div className="flex flex-col items-center">
                    <Heading size="h4">No Categories Yet!</Heading>
                    <p className="text-sm">
                      This would allow you set your categories for your products
                    </p>
                  </div>
                  <Button onClick={onOpen} size="small" className="mx-auto">
                    CREATE CATEGORY
                  </Button>
                </div>
              </FadeInOut>
            }
            elseThen={<ErrorMessage />}
          >
            <div className="max-w-5xl space-y-4 py-3">
              <div>
                <div>
                  <CategoryTable
                    categoryBtn={
                      <Button
                        onClick={onOpen}
                        size="xs"
                        className="flex-shrink-0 rounded-sm"
                      >
                        CREATE CATEGORY
                      </Button>
                    }
                  >
                    {categories?.value?.map((item) => (
                      <CategoryTableRow
                        key={item.id}
                        category={item}
                        refetchCategories={categories.refetch}
                      />
                    ))}
                  </CategoryTable>
                </div>
              </div>
            </div>
          </IfElse>
        </IfElse>
      </AnimatePresence>
      <CreateCategoryModal
        isOpen={isOpen}
        onClose={onClose}
        refetch={categories.refetch}
      />
    </div>
  );
};

export default CategorySection;
