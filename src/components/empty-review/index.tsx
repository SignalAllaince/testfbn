import Heading from "@/components/heading";
import Section from "@/components/section";
import Image from "next/image";
import wishlistImg from "../../../public/assets/review.svg";

function EmptyReview() {
  return (
    <Section className="my-4 flex w-full flex-col items-center justify-center space-y-6 py-5">
      <div className="max-w-xl">
        <Image src={wishlistImg} alt={"djsdsd"} />
      </div>
      <div className="flex flex-col items-center">
        <Heading size="h3">No reviews here right now!</Heading>
        <p>Clear filters or add reviews to see a list of your reviews!</p>
      </div>
    </Section>
  );
}

export default EmptyReview;
