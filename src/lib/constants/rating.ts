import sadEmoji from "../../../public/assets/sad.svg";
import smileEmoji from "../../../public/assets/smile.svg";
import staleEmoji from "../../../public/assets/stale.svg";

export type EmojiModel = {
  value: number;
  img: any;
  text: "satisfied" | "Indifferent" | "Disappointed";
};

export const emojiRatingsList: EmojiModel[] = [
  {
    value: 5,
    img: smileEmoji,
    text: "satisfied",
  },
  {
    value: 3,
    img: staleEmoji,
    text: "Indifferent",
  },
  {
    value: 1,
    img: sadEmoji,
    text: "Disappointed",
  },
];

export const renderEmoji = (text: EmojiModel["text"]) =>
  emojiRatingsList.find((item) => item.text === text)?.img;
