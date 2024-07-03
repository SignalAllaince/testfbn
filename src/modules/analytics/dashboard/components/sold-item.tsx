import Heading from "@/components/heading";
import Image from "next/image";
import { graph } from "../../../../../public/assets";

interface SoldProps {
  text: string;
  amount: string;
}
export default function SoldItem({ text, amount }: SoldProps) {
  return (
    <div className="flex w-full flex-1 items-center justify-between space-x-3 rounded-[4px] bg-white p-5">
      <div className="space-y-8">
        <p className="text-md font-medium text-obs-blue">{text}</p>
        {/* <Heading size="h3">&#8358; {amount}</Heading> */}
        <Heading size="h3">{amount}</Heading>
      </div>

      <div>
        <Image src={graph} alt="graph" />
      </div>
    </div>
  );
}
