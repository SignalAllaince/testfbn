import Button from "@/components/button";
import { Menu, MenuButton, MenuItem, MenuItems } from "@/components/menu";
import { CSSProperties } from "react";
import { BsCaretDownSquareFill } from "react-icons/bs";
import Spinner from "../spinner";

interface IFilterMenuProps {
  placeholder?: string;
  value?: string | number;
  isLoading?: boolean;
  options?: {
    label: string;
    value: string | number;
  }[];
  style?: CSSProperties;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string | number) => void;
  position?: "right" | "left";
}

function FilterMenu({
  placeholder = "Sort by",
  value,
  options,
  onChange,
  isLoading,
  style,
  position = "right",
}: IFilterMenuProps) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="secondary"
        size="special"
        style={style}
        disabled={isLoading}
        className="h-9 border-brand-light capitalize text-brand-dark"
        rightIcon={
          isLoading ? (
            <Spinner />
          ) : (
            <BsCaretDownSquareFill
              cursor="pointer"
              className="text-brand-darkest"
            />
          )
        }
      >
        {value ? value : placeholder}
      </MenuButton>
      <MenuItems
        menuClasses={`${
          position === "left" ? "left-0" : "right-0"
        } !w-40 bg-white divide-y mt-2 divide-gray-100`}
      >
        {options?.map((item) => (
          <MenuItem
            className="h-[38px] text-sm capitalize"
            activeBg="#506473"
            activeText="#fff"
            key={item.value}
            value={item.value}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}

export default FilterMenu;
