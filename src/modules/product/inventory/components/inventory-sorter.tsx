import Button from "@/components/button";
import FilterMenu from "@/components/filter-menu";
import Icon from "@/components/icon";
import CustomInput from "@/components/input";
import useGetProductsBySearchOptions from "@/hooks/products/useGetProductsBySearchOptions";
// import useGetProductsOrderedBy from "@/hooks/products/useGetProductsOrderedBy";
// import { catArr } from "@/utils/data";
import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import React, { FormEvent } from "react";

interface InventorySortProps {
  setParams: React.Dispatch<
    React.SetStateAction<{
      sort: string;
      search: string;
    }>
  >;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  searchParams: {
    sort: string;
    search: string;
  };
}

function InventorySortController({
  isLoading,
  setParams,
  searchParams,
  setPage,
}: InventorySortProps) {
  const [sort, setSort] = React.useState("Name");
  const [search, setSearch] = React.useState("");
  // const productOrderBy = useGetProductsOrderedBy();
  const productSearchBy = useGetProductsBySearchOptions();

  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return;
    setPage(1);
    setParams({
      search,
      sort,
    });
  };

  const clearFilters = () => {
    setSearch("");
    setParams({
      search: "",
      sort: "",
    });
  };
  return (
    <>
      <div className="space-y-8 bg-white p-7">
        <div className="flex flex-col justify-start gap-4 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex h-[2.5rem] flex-1">
            <form
              onSubmit={searchHandler}
              className="relative flex w-full max-w-xl items-end space-x-0"
            >
              <div className="space-y-1 pr-1">
                <p className="text-sm font-bold">Search By</p>
                <FilterMenu
                  placeholder="All"
                  options={
                    productSearchBy?.value
                      ? productSearchBy?.value
                          ?.filter(
                            (item) =>
                              ![
                                "Sku",
                                "Gtin",
                                "IsAllowToOrder",
                                "TaxClass",
                                "HasOption",
                                "IsFeatured",
                              ].includes(item.id)
                          )
                          ?.map((item) => ({
                            label: item.name,
                            value: item.id,
                          }))
                      : undefined
                  }
                  isLoading={productSearchBy.isLoading}
                  value={sort}
                  style={{
                    height: "2.6rem",
                    borderRadius: "0px",
                  }}
                  onChange={(value) => setSort(value as string)}
                />
              </div>

              <div className="flex w-full flex-1">
                <CustomInput
                  name="search"
                  rounded="rounded-none"
                  placeholder="Search"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <Button
                isLoading={isLoading}
                type="submit"
                className="rounded-none border-0 px-[12px] outline-none focus:border-0 focus:ring-0 focus:ring-transparent"
              >
                <Icon IconComp={MagnifyingGlassIcon} className="text-white" />
              </Button>

              {searchParams.search && searchParams.sort && (
                <div className="absolute -right-12 bottom-0 pl-2">
                  <Button
                    variant="secondary"
                    onClick={clearFilters}
                    size="xs"
                    type="button"
                    className="px-[10px] outline-none"
                  >
                    <Icon
                      IconComp={ArrowPathIcon}
                      className="text-brand-blue"
                    />
                  </Button>
                </div>
              )}
            </form>
          </div>

          <Button
            size="small"
            href="/inventory/add-product"
            leftIcon={<Icon IconComp={PlusCircleIcon} />}
          >
            Add product
          </Button>
        </div>

        {/* <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-5">
            <div>
              <FilterMenu
                placeholder="All"
                options={catArr}
                value={sort}
                onChange={(value) => setSort(value as string)}
              />
            </div>
            <div>
              <FilterMenu
                placeholder="All"
                options={catArr}
                value={sort}
                onChange={(value) => setSort(value as string)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <FilterMenu
              placeholder="Sort By"
              options={
                productOrderBy?.value
                  ? productOrderBy?.value?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))
                  : undefined
              }
              isLoading={productOrderBy.isLoading}
              value={sort}
              onChange={(value) => setSort(value as string)}
            />
          </div>
        </div>  */}
      </div>
    </>
  );
}

export default InventorySortController;
