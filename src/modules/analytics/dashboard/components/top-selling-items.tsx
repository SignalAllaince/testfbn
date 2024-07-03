import Button from "@/components/button";
import Icon from "@/components/icon";
import TopSales from "@/components/top-sales";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

interface items {
  name: string;
  price: string;
  sales: number;
}

export default function TopSellingItems({ name = "items" }: { name?: string }) {
  const itemsArray: items[] = [
    {
      name: "A4 Snapper Frame",
      price: "₦5,875",
      sales: 2456,
    },
    {
      name: "A4 Snapper Frame",
      price: "₦5,875",
      sales: 2456,
    },
    {
      name: "A4 Snapper Frame",
      price: "₦5,875",
      sales: 2456,
    },
    {
      name: "A4 Snapper Frame",
      price: "₦5,875",
      sales: 2456,
    },
    {
      name: "A4 Snapper Frame",
      price: "₦5,875",
      sales: 2456,
    },
  ];

  return (
    <div className="w-full rounded-[4px] bg-white p-4 text-obs-blue">
      <div className="flex items-center justify-between">
        <p className="text-md font-medium ">Top selling {name}</p>
        <Button
          variant="secondary"
          size="xs"
          className="!h-7 !px-3 !text-[11px]"
          leftIcon={<Icon IconComp={ArrowUpOnSquareIcon} boxSize={4} />}
        >
          Export
        </Button>
      </div>

      <div className="pt-4">
        {itemsArray.map((item, index) => (
          <TopSales
            key={index}
            name={item.name}
            sales={item.sales}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}
