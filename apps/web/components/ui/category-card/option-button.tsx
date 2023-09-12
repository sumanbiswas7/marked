"use client";

import { IconX, IconDots } from "@tabler/icons-react";
import { COLORS } from "../../../theme/colors";
import styles from "./option-button.module.scss";
import { motion } from "framer-motion";

export function OptionButton({ onClick, opened }: Props): JSX.Element {
   return (
      <motion.button
         onClick={onClick}
         whileHover={{ scale: 1.2, rotate: 180 }}
         whileTap={{ scale: 0.85 }}
         className={styles.options}
         style={{ backgroundColor: COLORS.textSwatch }}
      >
         {opened ? (
            <IconX size={13} color={COLORS.textLight2Swatch} />
         ) : (
            <IconDots size={13} color={COLORS.textLight2Swatch} />
         )}
      </motion.button>
   );
}

interface Props {
   onClick?: () => void;
   opened?: boolean;
}
