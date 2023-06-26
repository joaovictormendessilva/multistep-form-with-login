import arcadeIcon from "../assets/icon-arcade.svg";
import advancedIcon from "../assets/icon-advanced.svg";
import proIcon from "../assets/icon-pro.svg";

export const cardData = [
  {
    id: 1,
    idInput: "arcade",
    image: arcadeIcon,
    imageAlt: "Ícone do plano arcade",
    labelHtmlFor: "arcade",
    label: "Arcade",
    value: "Arcade",
    monthlyPrice: 9,
    yearlyPrice: 90,
  },
  {
    id: 2,
    idInput: "advanced",
    image: advancedIcon,
    imageAlt: "Ícone do plano advanced",
    labelHtmlFor: "advanced",
    label: "Advanced",
    value: "Advanced",
    monthlyPrice: 12,
    yearlyPrice: 120,
  },
  {
    id: 3,
    idInput: "pro",
    image: proIcon,
    imageAlt: "Ícone do plano pro",
    labelHtmlFor: "pro",
    label: "Pro",
    value: "Pro",
    monthlyPrice: 15,
    yearlyPrice: 150,
  },
];
