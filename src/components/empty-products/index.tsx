import Heading from "@/components/heading";
import Section from "@/components/section";
import Image from "next/image";
import wishlistImg from "../../../public/assets/top.svg";

function EmptyProduct() {
  return (
    <Section className="my-4 flex w-full flex-col items-center justify-center space-y-6 py-5">
      <div className="max-w-xl">
        <Image src={wishlistImg} alt={"djsdsd"} />
      </div>
      <div className="flex flex-col items-center">
        <Heading size="h3">No product found!</Heading>
        <p>Clear filters or add products to see a list of your products!</p>
      </div>
    </Section>
  );
}

export default EmptyProduct;
