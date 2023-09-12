"use client";

import { COLORS } from "../../../theme/colors";
import styles from "./option-button.module.scss";
import { motion } from "framer-motion";

export function OptionButton({ onClick }: Props): JSX.Element {
   return (
      <motion.button
         onClick={onClick}
         whileHover={{ scale: 1.2, rotate: 180 }}
         className={styles.options}
         style={{ backgroundColor: COLORS.textSwatch }}
      >
         <img src="/category_card/three-dot.svg" />
      </motion.button>
   );
}

interface Props {
   onClick?: () => void;
}
