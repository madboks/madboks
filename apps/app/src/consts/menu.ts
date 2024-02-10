import { IconBox } from "@/components/icons/box";
import { IconShift } from "@/components/icons/shift";

export const MENU: readonly {
  link: string;
  text: string;
  description: string;
  icon:  React.FC<React.SVGProps<SVGSVGElement>>;
}[] = [
  {
    link: '/sign-up',
    text: 'Sign up',
    description: 'book your the next shift!',
    icon: IconShift
  },
  {
    link: '/registration',
    text: 'Food registration',
    description: 'how many kg?',
    icon: IconBox
  }
];
