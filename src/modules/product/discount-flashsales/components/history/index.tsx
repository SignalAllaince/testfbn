import HistoryFilter from "./history-sorter";
import HistoryTable from "./history-table";

function FlashSalesHistory({
  startFlashSales,
}: {
  startFlashSales: () => void;
}) {
  return (
    <div>
      <HistoryFilter />
      <HistoryTable startFlashSales={startFlashSales} />
    </div>
  );
}

export default FlashSalesHistory;
