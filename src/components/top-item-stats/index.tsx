import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import Button from "../button";
import FadeInOut from "../fade";
import Heading from "../heading";
import Icon from "../icon";

interface SalesListProps {
  customer: string;
  totalBought: number;
}

interface SalesProps {
  headerText: string;
  arr: SalesListProps[];
}
export default function TopItemStats({ headerText, arr }: SalesProps) {
  return (
    <div className="h-full w-full rounded-[4px] bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-lg font-medium leading-[22px] text-obs-blue">
          {headerText}
        </p>
        <Button
          variant="secondary"
          size="xs"
          className="!h-7 !px-3 !text-[11px]"
          leftIcon={<Icon IconComp={ArrowUpOnSquareIcon} boxSize={4} />}
        >
          Export All
        </Button>
      </div>

      <div className="mt-6 space-y-3 text-[13px] font-light text-obs-blue">
        {arr?.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <p>{item?.customer}</p>
            {item?.totalBought && (
              <p>
                <span className="font-medium">{item.totalBought}</span> Items
              </p>
            )}
          </div>
        ))}
        {arr?.length === 0 && (
          <div className="py-8 text-center">
            <p className="font-bold">No record found</p>
          </div>
        )}
        {!arr && (
          <FadeInOut>
            <div className="flex h-[150px] w-full items-center justify-center bg-white text-center">
              <Heading size="h5" className="text-slate-600">
                Something Went wrong
              </Heading>
            </div>
          </FadeInOut>
        )}
      </div>
    </div>
  );
}
