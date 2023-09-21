"use client";

import { Link } from "@marked/types";
import styles from "./category-link.module.scss";
import { useTheme } from "../../../hooks/use-theme";
import { IconTrash } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { getFormattedDate } from "../../../utils/format-date";
import { modals } from "@mantine/modals";
import { LoadingOverlay, Text } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLinkById } from "../../../api/link/delete-link";
import { useState } from "react";
import { HttpResponse } from "@marked/utils";
import { successNotification, warnNotification } from "../../../utils/show-notifications";

export function CategoryLink({ link }: Props) {
   const queryClient = useQueryClient();
   const [loading, setLoading] = useState(false);
   const { theme } = useTheme();

   const deleteMutaiton = useMutation({
      mutationFn: () => deleteLinkById(link.id, link.categoryId),
      onSuccess: onMutationSuccess,
      onError: onMutationError,
   });

   async function onMutationSuccess() {
      queryClient.invalidateQueries({ queryKey: ["links", link.categoryId] });
      // wait 500ms for state update
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
      warnNotification(`Link deleted`);
   }
   function onMutationError(e: HttpResponse) {
      setLoading(false);
      warnNotification(e.message || "Unable to delete link");
   }

   function handleDelete() {
      setLoading(true);
      deleteMutaiton.mutate();
   }

   return (
      <>
         <LoadingOverlay visible={loading} />

         <motion.div
            style={{ position: "relative", backgroundColor: theme.card.shade2 }}
            className={styles.main_cont}
            whileHover={{ translateX: 10 }}
         >
            <a href={link.link} target="_blank" style={{ textDecoration: "none" }} className={styles.link_cont}>
               <motion.div className={styles.container}>
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

            <motion.span whileHover={{ scale: 1.5 }} whileTap={{ scale: 0.8 }} className={styles.icon_cont}>
               <IconTrash color={theme.red} size={20} className={styles.icon} onClick={openLinkDeleteModal} />
            </motion.span>
         </motion.div>
      </>
   );

   /**
    * ------------------
    *       Modal
    * ------------------
    */

   function openLinkDeleteModal() {
      modals.openConfirmModal({
         title: `Delete Confirmation`,
         centered: true,
         children: (
            <Text size="sm">
               Please be aware that the link{" "}
               <Text span color="red">
                  {link.link}
               </Text>{" "}
               will be deleted forever.
            </Text>
         ),
         labels: { confirm: "Delete link", cancel: "No don't delete it" },
         confirmProps: { color: "red" },
         onConfirm: handleDelete,
      });
   }
}

interface Props {
   link: Link;
}
