import Button from "@/components/button";
import Icon from "@/components/icon";
import useNotification from "@/hooks/use-notification";
import { TrashIcon } from "@heroicons/react/20/solid";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

type ImageUploadProps = {
  setSelectedImages: React.Dispatch<React.SetStateAction<any[]>>;
  renderedImages: any[];
};
function ImageUpload({ setSelectedImages, renderedImages }: ImageUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useNotification();

  const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedFiles = Array.from(files) as File[];
      if (renderedImages.length + selectedFiles.length <= 4) {
        setSelectedImages((prevImages) => [...prevImages, ...selectedFiles]);
      } else {
        // Handle error or display a message that the limit has been reached
        toast({
          appearance: "error",
          description: `Maximum limit of four images reached`,
        });
      }
    }
  };

  const handleDeleteImage = (imgIndex: number) => {
    const newImgList = renderedImages.filter(
      (img, index) => index !== imgIndex
    );
    setSelectedImages(newImgList);
  };

  return (
    <div className="sticky top-0 order-1 mx-auto space-y-4 lg:order-2">
      <div className="space-y-1">
        <p className="text-md font-medium leading-[22px]">Product Image(s)</p>
        <div className="flex items-center justify-start gap-2 rounded-[4px] bg-[#F5F8FA] p-2">
          <AiOutlineInfoCircle size={20} />
          <p className="text-xs leading-[16px] text-obs-blue">
            Ensure the images are clear images of the product that do not exceed
            5MB, and are one of JPG or PNG. You can upload up to 4 images.
          </p>
        </div>
      </div>

      <div
        className={`${
          renderedImages.length > 0 ? "" : "items-center justify-center"
        } hide-scroll-bar flex min-h-[500px] flex-col rounded-[4px] border bg-[#F5F8FA] p-4`}
      >
        <div
          className={`${
            renderedImages.length === 0
              ? "flex h-full items-center justify-center"
              : "grid grid-cols-2 gap-3"
          }`}
        >
          {renderedImages.map((image, index) => (
            <div
              key={index}
              className="relative h-60 w-full rounded-md transition-all duration-300"
            >
              <div className="group absolute right-0 top-0 grid h-full w-full place-items-center bg-black bg-opacity-0 transition-all duration-300 hover:bg-opacity-40">
                <Button
                  onClick={() => handleDeleteImage(index)}
                  variant="outline"
                  className="hidden transition-all duration-300 group-hover:flex"
                >
                  <Icon IconComp={TrashIcon} color="white" />
                </Button>
              </div>
              <Image
                src={image?.url ? image.url : URL.createObjectURL(image)}
                alt={`Preview ${index + 1}`}
                className="h-full w-full object-cover"
                width="500"
                height="400"
              />
            </div>
          ))}
          {!(renderedImages.length === 4) && (
            <div className="grid h-60 place-items-center">
              <div className="relative mx-auto my-auto flex h-28 w-28 flex-col items-center justify-center px-2 pb-6">
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
                <div className="pb-1 text-center">
                  <Icon
                    IconComp={PhotoIcon}
                    boxSize={16}
                    className="text-gray-300"
                  />
                </div>

                <label
                  className="flex w-full cursor-pointer justify-center rounded bg-btn-blue px-2 py-1 text-xs text-white"
                  onClick={handleLabelClick}
                >
                  Click to upload
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ImageUpload);
