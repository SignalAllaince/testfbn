import Button from "@/components/button";
import Heading from "@/components/heading";
import Section from "@/components/section";
import Image from "next/image";
import wishlistImg from "../../../../../../public/assets/wishlist.svg";

function EmptyHistory({ onClick }: { onClick: () => void }) {
  return (
    <Section className="my-4 flex w-full flex-col items-center justify-center space-y-12  py-10">
      <div className="max-w-xl">
        <Image src={wishlistImg} alt={"djsdsd"} />
      </div>
      <div className="flex flex-col items-center">
        <Heading size="h3">No flash sale yet!</Heading>
        <p>Navigate to the Flash Sales tab to get started!</p>
      </div>
      <Button className="uppercase" onClick={onClick} size="small">
        Start flash sales
      </Button>
    </Section>
  );
}

export default EmptyHistory;
