import { Option } from "@/types/component.types";
import { AiOutlineCoffee, AiOutlineMedicineBox } from "react-icons/ai";
import { BsBagCheck, BsHeadphones, BsPhone, BsTools } from "react-icons/bs";
import {
  GiBabyFace,
  GiClothes,
  GiConverseShoe,
  GiFruitBowl,
  GiGemNecklace,
  GiNecklace,
  GiSoap,
  GiTravelDress,
} from "react-icons/gi";
import { ImSpoonKnife } from "react-icons/im";
import { IoIosWoman } from "react-icons/io";
import { SiBookstack } from "react-icons/si";
import { SlPicture } from "react-icons/sl";

import {
  IoCarSportOutline,
  IoGameControllerOutline,
  IoHomeOutline,
  IoShirtOutline,
} from "react-icons/io5";
import {
  MdComputer,
  MdOutlineSportsHandball,
  MdPedalBike,
} from "react-icons/md";

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const joinCategories = (categories: Option[]): string =>
  categories.map((x) => x.value).join(",");

export const splitCategory = (categories: string) =>
  categories.split(",").map((item) => +item);

export const categoryIcons = [
  { icon: MdPedalBike, label: "Bike", value: "Bike" },
  { icon: GiClothes, label: "Clothes", value: "Clothes" },
  { icon: GiGemNecklace, label: "Necklace", value: "Necklace" },
  { icon: GiNecklace, label: "Jewerly", value: "Jewerly" },

  { icon: GiSoap, label: "Soap", value: "Soap" },
  { icon: GiBabyFace, label: "Baby", value: "Baby" },
  { icon: IoHomeOutline, label: "Home", value: "Home" },

  { icon: MdComputer, label: "Computer", value: "Computer" },
  { icon: BsPhone, label: "Phone", value: "Phone" },
  { icon: BsHeadphones, label: "Headphone", value: "Headphone" },
  { icon: IoGameControllerOutline, label: "Game", value: "Game" },
  { icon: GiFruitBowl, label: "Fruit", value: "Fruit" },
  { icon: MdOutlineSportsHandball, label: "Sport", value: "Sport" },
  { icon: IoCarSportOutline, label: "Car", value: "Car" },
  { icon: IoIosWoman, label: "Woman", value: "Woman" },
  { icon: IoShirtOutline, label: "Man's Clothes", value: "Man" },

  { icon: AiOutlineMedicineBox, label: "Health", value: "Health" },
  { icon: SiBookstack, label: "Books", value: "Books" },
  { icon: SlPicture, label: "Picture", value: "Picture" },
  { icon: AiOutlineCoffee, label: "Cups", value: "Cups" },
  { icon: BsTools, label: "Tools", value: "Tools" },
  { icon: BsBagCheck, label: "Bags", value: "Bags" },

  { icon: ImSpoonKnife, label: "Utensils", value: "Utensils" },
  { icon: GiConverseShoe, label: "Shoe", value: "Shoe" },
  { icon: GiTravelDress, label: "Dress", value: "Dress" },
];
