interface ITopSalesProps {
  price: string;
  name: string;
  sales: number;
}
function TopSales({
  name = "A4 Snapper Frame",
  sales = 2456,
  price = "₦5,875",
}: Partial<ITopSalesProps>) {
  return (
    <div className="flex items-start justify-between border-b border-[#F5F8FA] py-2 font-light">
      <div className="flex items-center justify-start gap-2">
        <div className="h-9 w-9 rounded-[4px] bg-btn-light"></div>
        <div className="flex h-9 flex-col justify-between py-0.5 text-sm">
          <p className="leading-[12.1px] text-obs-blue">{name}</p>
          <p className="font-medium leading-[12.1px] text-obs-blue">{price}</p>
        </div>
      </div>

      <div>
        <p className="text-sm leading-[12.1px] text-obs-blue">{sales} sales</p>
      </div>
    </div>
  );
}

export default TopSales;
