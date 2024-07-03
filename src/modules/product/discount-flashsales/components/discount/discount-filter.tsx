import Button from "@/components/button";
import FilterMenu from "@/components/filter-menu";
import Icon from "@/components/icon";
import CustomInput from "@/components/input";
import { catArr } from "@/utils/data";
import {
  InformationCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import React, { FormEvent } from "react";

function DiscountFilter() {
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("");

  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return;
  };
  return (
    <div className="space-y-10 border bg-white px-6 py-8">
      <div>
        <form
          onSubmit={searchHandler}
          className="flex w-full max-w-[400px] space-x-0"
        >
          <CustomInput
            name="search"
            rounded="rounded-none"
            placeholder="Search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            type="submit"
            className="rounded-none border-0 px-[12px] outline-none focus:border-0 focus:ring-0 focus:ring-transparent"
          >
            <Icon IconComp={MagnifyingGlassIcon} className="text-white" />
          </Button>
        </form>
        <div className="flex items-center space-x-2 pt-1 text-xs font-light text-brand-dark">
          <Icon IconComp={InformationCircleIcon} boxSize={4} />
          <p>
            Search for the product you wish to add to the Flash Sales and add
            them.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between gap-3">
          <FilterMenu
            placeholder="Category"
            options={catArr}
            value={sort}
            onChange={(value) => setSort(value as string)}
          />
          <FilterMenu
            placeholder="Sub-Category"
            options={catArr}
            value={sort}
            onChange={(value) => setSort(value as string)}
          />
        </div>

        <div>
          <FilterMenu
            // placeholder="Sub-Category"
            options={catArr}
            value={sort}
            onChange={(value) => setSort(value as string)}
          />
        </div>
      </div>
    </div>
  );
}

export default DiscountFilter;
