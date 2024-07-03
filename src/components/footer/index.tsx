import { EnvelopeIcon } from "@heroicons/react/24/outline";
import Section from "../section";

function Footer() {
  return (
    <div className="w-full bg-brand-blue py-7 text-xs text-white">
      <Section className="flex  flex-col items-center justify-start gap-4 sm:flex-row sm:items-end sm:justify-between">
        <p>© 2023. First Bank of Nigeria Ltd. An FBNHoldings Company.</p>
        <div className="space-y-6">
          <div className="flex gap-4">
            <a href="#" className="flex items-center gap-2">
              <EnvelopeIcon className="h-5 w-5" />
              help@firstbankltd.com
            </a>
          </div>
          <a href="#" className="flex">
            Privacy Policy & Terms of Use
          </a>
        </div>
      </Section>
    </div>
  );
}

export default Footer;
