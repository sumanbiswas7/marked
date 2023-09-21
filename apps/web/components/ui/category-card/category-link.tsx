"use client";

import { Link } from "@marked/types";
import styles from "./category-link.module.scss";
import { useTheme } from "../../../hooks/use-theme";
import { IconTrash } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { getFormattedDate } from "../../../utils/format-date";

export function CategoryLink({ link }: Props) {
   const { theme } = useTheme();

   function handleDeleteClick() {
      console.log("delete");
   }

   return (
      <div style={{ position: "relative" }}>
         <motion.span whileHover={{ scale: 1.2, rotate: 25 }} whileTap={{ scale: 0.8 }}>
            <IconTrash color={theme.red} size={20} className={styles.icon} onClick={handleDeleteClick} />
         </motion.span>

         <a href={link.link} target="_blank" style={{ textDecoration: "none" }}>
            <motion.div
               whileHover={{ translateX: 10 }}
               style={{ backgroundColor: theme.card.shade2 }}
               className={styles.container}
            >
               <div className={styles.top_box} style={{ marginBottom: 5, color: theme.text.shade1 }}>
                  <p>{link.title || "No Title"}</p>
               </div>

               <div className={styles.bottom_box}>
                  <p
                     style={{
                        color: theme.text.shade2,
                        textDecoration: "underline",
                     }}
                     className={styles.link_p}
                  >
                     {link.link}
                  </p>
                  <p style={{ color: theme.text.shade2 }}>{getFormattedDate(link.createdAt, "Do MMM")}</p>
               </div>
            </motion.div>
         </a>
      </div>
   );
}

interface Props {
   link: Link;
}
