import {
  ArrowLeftOnRectangleIcon,
  ChevronDownIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { logo } from "../../../public/assets";
import Button from "../button";
import Icon from "../icon";
import { Menu, MenuButton, MenuItem, MenuItems } from "../menu";

export default function Navbar({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="sticky left-0 top-0 z-30 flex h-[70px] w-full items-center justify-between border-b bg-white px-12 shadow-sm">
      <div className="max-w-[100px]">
        <Image src={logo} alt="logo" />
      </div>

      <div className="">
        <Menu>
          <MenuButton
            as={Button}
            variant="secondary"
            size="small"
            className="border-0 px-[4px]"
            leftIcon={<Icon IconComp={UserCircleIcon} />}
            rightIcon={<Icon IconComp={ChevronDownIcon} boxSize={4} />}
          >
            Admin
          </MenuButton>
          <MenuItems menuClasses="right-0 bg-white divide-y divide-gray-100 mt-[18px] z-30 !w-40">
            <MenuItem
              leftIcon={<Icon IconComp={ArrowLeftOnRectangleIcon} />}
              onClick={onLogout}
            >
              Logout
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
