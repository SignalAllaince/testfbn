import { cn } from "@/lib/utils/component.utils";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Button from "../button";
import Heading from "../heading";
import Icon from "../icon";

interface headerProps {
  heading: string;
  isPrev?: boolean;
  className?: string;
}
export default function Header({
  heading,
  isPrev = false,
  className = "",
}: headerProps) {
  const router = useRouter();
  const classNames = cn(
    "flex items-center gap-4 bg-white px-7 py-6",
    className
  );

  return (
    <div className={classNames}>
      {isPrev && (
        <Button variant="outline" onClick={() => router.back()}>
          <Icon IconComp={ArrowLeftIcon} color="#000" />
        </Button>
      )}
      <Heading size="h3">{heading}</Heading>
    </div>
  );
}
