import Button from "@/components/button";
import Heading from "@/components/heading";
import CustomInput from "@/components/input";
import DateSelect from "@/widgets/select/DateSelect";
import Image from "next/image";
import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Modal from "..";

interface DateFilter {
  fromDate: Date | null;
  toDate: Date | null;
}

function FlashSaleModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  onRemoveHandler?: () => void;
  isLoading?: boolean;
}) {
  const [selectedImages, setSelectedImages] = React.useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedFiles = Array.from(files) as File[];
      if (selectedImages.length + selectedFiles.length <= 4) {
        setSelectedImages((prevImages) => [...prevImages, ...selectedFiles]);
      } else {
        // Handle error or display a message that the limit has been reached
        alert("maximum limit for images reached");
      }
    }
  };

  const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const today = new Date();

  const [dateFilter, setDateFilter] = React.useState<DateFilter>({
    fromDate: today,
    toDate: today,
  });

  const handleFromDateChange = (date: Date | null) => {
    setDateFilter((prevState) => ({
      ...prevState,
      fromDate: date,
    }));
  };

  const handleToDateChange = (date: Date | null) => {
    setDateFilter((prevState) => ({
      ...prevState,
      toDate: date,
    }));
  };
  return (
    <Modal
      isOpen={isOpen}
      closeModal={onClose}
      title={
        <Heading size="h4" className="pl-3">
          Create Flash Sale
        </Heading>
      }
    >
      <div className="space-y-8 py-5 text-obs-blue md:px-5">
        <div className="relative space-y-6">
          <div>
            <CustomInput name="sale" label="Flash Sale Title" />
          </div>

          <div className="relative">
            <p className="text-md font-medium">Products in Flash Sale</p>
            <div className="hide-scroll-bar mt-2 flex items-center space-x-1 overflow-x-scroll pr-[3.2rem]">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex w-full max-w-[270px] flex-shrink-0 items-center space-x-2 rounded-[4px] border border-[#DAE8F2] p-2"
                >
                  <div className="h-12 w-10 flex-shrink-0 rounded-[4px] bg-[#DAE8F2]"></div>
                  <p className="text-xs">
                    Independence Day Commemorative Notebook: The rest of the
                    product Name goes here
                  </p>
                </div>
              ))}
            </div>
            <div className="absolute right-0 top-9 flex h-[3rem] w-[3rem] items-center justify-center rounded-[4px] bg-[#F5F8FA]">
              <p className="text-md font-medium leading-[22px]">+48</p>
            </div>
          </div>

          <hr />

          <div>
            <div className="space-y-1">
              <p className="text-md font-medium leading-[22px] text-obs-blue">
                Banner Upload
              </p>
              <div className="hide-scroll-bar flex items-center justify-start gap-2 overflow-x-scroll rounded-[4px] border border-[#DAE8F2] p-2">
                <div className="relative h-24 w-24 bg-[#F5F8FA]">
                  <input
                    type="file"
                    id="images"
                    name="images"
                    accept="image/*"
                    multiple
                    className="invisible relative z-10 mt-6"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                  />
                  <label
                    className="absolute left-3 top-8 mx-auto flex cursor-pointer items-center justify-center rounded-[4px] bg-btn-blue p-2 text-[.5rem] leading-[10px] text-white"
                    onClick={handleLabelClick}
                  >
                    Click to upload
                  </label>
                </div>

                <div className="flex items-center">
                  {selectedImages.map((image, index) => (
                    <Image
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="mt-2 h-24 w-24 rounded-lg object-cover"
                      width="200"
                      height="200"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-1 flex items-center justify-start gap-2 rounded-[4px] bg-[#F5F8FA] p-2 text-xs">
              <div className="flex-shrink-0">
                <AiOutlineInfoCircle size={15} />
              </div>
              <p>
                Ensure the images are clear images of the product that do not
                exceed 5MB, and are one of JPG or PNG. You can upload up to 4
                images.
              </p>
            </div>
          </div>

          <hr />

          <div>
            <div>
              <CustomInput name="sale" label="Amount waved off (%)" />
            </div>

            <div className="mt-2 flex w-fit items-center gap-2 rounded-[4px] bg-[#F5F8FA] p-2 text-xs text-obs-blue">
              <AiOutlineInfoCircle size={15} />
              <p>This percentage affects every product selected above</p>
            </div>
          </div>

          <div className="flex  items-center space-x-20">
            <div className="space-y-1">
              <p className="text-[13px]">Start Date</p>
              <DateSelect
                style={{
                  maxWidth: "320px",
                }}
                className="items-center rounded-[4px] border border-[#DAE8F2] p-3 text-lg"
                placeholderText="Departure"
                selected={dateFilter.fromDate}
                onChange={handleFromDateChange}
                // minDate={getFutureDate(1)}
                nullValuePlaceHolder={dateFilter.fromDate?.toLocaleDateString()}
              />
            </div>

            <div className="space-y-1">
              <p className="text-[13px]">End Date</p>
              <DateSelect
                style={{
                  maxWidth: "320px",
                }}
                className="items-center rounded-[4px] border border-[#DAE8F2] p-3 text-lg"
                placeholderText="Departure"
                selected={dateFilter.fromDate}
                onChange={handleToDateChange}
                // minDate={getFutureDate(1)}
                nullValuePlaceHolder={dateFilter.fromDate?.toLocaleDateString()}
              />
            </div>
          </div>

          <div className="w-full pt-3">
            <Button
              className="w-full text-md !font-semibold uppercase"
              // onClick={handleSuccessModal}
            >
              Create Flash sale
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
export default FlashSaleModal;
