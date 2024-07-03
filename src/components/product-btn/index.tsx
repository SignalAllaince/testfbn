import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import Icon from "../icon";

function CartProductBtn({
  quantity = 1,
  onIncrease,
  onDecrease,
}: {
  quantity?: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
}) {
  return (
    <div className="flex h-9 w-fit items-center gap-0 divide-x divide-brand-light rounded-[4px] border border-brand-light">
      <button
        onClick={onDecrease}
        className="disa grid h-9 w-9 appearance-none place-items-center rounded-l-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Icon IconComp={MinusIcon} />
      </button>
      <div className="grid h-9 w-9 place-items-center text-sm font-medium">
        {quantity}
      </div>
      <button
        onClick={onIncrease}
        className="disa grid h-9 w-9 appearance-none place-items-center rounded-r-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Icon IconComp={PlusIcon} />
      </button>
    </div>
  );
}

export default CartProductBtn;
