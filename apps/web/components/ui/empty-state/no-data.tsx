"use client";

import { useTheme } from "../../../hooks/use-theme";
import styles from "./no-data.module.scss";
import { motion } from "framer-motion";

export function NoData({
   img,
   description,
   title,
   buttonTitle,
   onClick,
}: Props) {
   const { theme } = useTheme();

   return (
      <div className={styles.container}>
         <img src={img} />
         <p className={styles.title} style={{ color: theme.text.shade1 }}>
            {title}
         </p>
         <p className={styles.desc} style={{ color: theme.text.shade2 }}>
            {description}
         </p>
         {buttonTitle && (
            <motion.button
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.8 }}
               onClick={onClick}
               style={{
                  backgroundColor: theme.accent,
                  color: theme.text.shade3,
               }}
               className={styles.btn}
            >
               {buttonTitle}
            </motion.button>
         )}
      </div>
   );
}

interface Props {
   title?: string;
   description?: string;
   img: string;
   buttonTitle?: string;
   onClick?: () => void;
}
