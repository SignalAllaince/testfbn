import Button from "@/components/button";
import FilterMenu from "@/components/filter-menu";
import Icon from "@/components/icon";
import { catArr } from "@/utils/data";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import React from "react";

function ReportTableFilter() {
  const [sort, setSort] = React.useState("");

  return (
    <div className="space-y-3 bg-white px-6 py-4">
      <p className="text-md">New Customers</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-5">
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

        <Button
          variant="secondary"
          size="xs"
          className="!h-8 !px-3 !text-[11px]"
          leftIcon={<Icon IconComp={ArrowUpOnSquareIcon} boxSize={4} />}
        >
          Export
        </Button>
      </div>
    </div>
  );
}

export default ReportTableFilter;
