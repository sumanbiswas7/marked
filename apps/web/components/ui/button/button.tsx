import { COLORS } from "../../../theme/colors";
import styles from "./button.module.scss";
import Link from "next/link";

export function Button({ type, onCLick, title, link }: Props): JSX.Element {
   const customStyles =
      type == "outlined"
         ? {
              backgroundColor: "transparent",
              borderColor: COLORS.textSwatch,
              color: COLORS.textSwatch,
           }
         : {
              backgroundColor: COLORS.textSwatch,
              borderColor: COLORS.textSwatch,
              color: COLORS.textLight2Swatch,
           };

   if (link)
      return (
         <Link
            href={link}
            onClick={onCLick}
            className={styles.container}
            style={customStyles}
         >
            {title}
         </Link>
      );

   return (
      <button
         onClick={onCLick}
         className={styles.container}
         style={customStyles}
      >
         {title}
      </button>
   );
}

interface Props {
   type?: "filled" | "outlined";
   onCLick?: () => void;
   title: string;
   bgCol?: string;
   color?: string;
   link?: string;
}
