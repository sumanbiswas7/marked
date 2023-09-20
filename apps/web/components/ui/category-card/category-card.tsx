"use client";

import { LoadingOverlay, Menu, Text } from "@mantine/core";
import { lightenHexColor } from "../../../utils/lighten-hexcol";
import { sliceText } from "../../../utils/slice-text";
import { CategoryCardMenu } from "../../menu/category-card-menu";
import styles from "./category-card.module.scss";
import { OptionButton } from "./option-button";
import { useState } from "react";
import { modals } from "@mantine/modals";
import { Category } from "@marked/types";
import { IconCalendar } from "@tabler/icons-react";
import { useTheme } from "../../../hooks/use-theme";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { deleteCategoryById } from "../../../api/category/delete-category";
import { queryClient } from "../../provider/tanstack-provider";
import { successNotification, warnNotification } from "../../../utils/show-notifications";
import { getFormattedDate } from "../../../utils/format-date";

export function CategoryCard({ category, onEdit }: Props): JSX.Element {
   const [loading, setLoading] = useState(false);
   const [menu, setMenu] = useState(false);
   const { theme } = useTheme();

   const mutation = useMutation({
      mutationFn: deleteCategoryMutation,
      onSuccess: onMutationSuccesss,
      onError: onMutationError,
   });

   async function onMutationSuccesss() {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      // wait 500ms for state update
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
      successNotification(`Category Deleted`);
   }

   function onMutationError() {
      setLoading(false);
      warnNotification(`Opps! something went wrong`);
   }

   const bgColStyle = { backgroundColor: category.color! };
   const bgImgStyle = { backgroundImage: `url(${category.image})` };
   const lightenBgCol = lightenHexColor(category.color || "#000", 50);

   async function deleteCategoryMutation() {
      setLoading(true);
      await deleteCategoryById(category.id);
   }

   function handleDeleteCategoryClick() {
      setMenu(false);
      openCategoryDeleteModal(category.title, category.id);
   }

   function handleEditCategoryClick() {
      setMenu(false);
      if (onEdit) onEdit(category.id);
   }

   return (
      <Menu opened={menu} shadow="md">
         <LoadingOverlay visible={loading} />

         <div style={{ position: "relative" }} className={styles.main_div}>
            <OptionButton onClick={() => setMenu(!menu)} opened={menu} />
            <Link href={`/dashboard/categories/${category.id}`} style={{ textDecoration: "none" }}>
               <div
                  className={styles.container}
                  style={{
                     borderColor: theme.colorScheme === "dark" ? theme.border.shade1 : theme.accent,
                  }}
               >
                  {/* REVIEW: Hide cover image for now */}
                  {/* <div className={styles.top_box} style={category.image ? bgImgStyle : bgColStyle}> */}
                  <div className={styles.top_box} style={bgColStyle}>
                     <div
                        style={{
                           color: theme.colorScheme === "dark" ? theme.background : theme.text.shade1,
                           backgroundColor: lightenBgCol || "#4d4d4d",
                           // display: category.image ? "none" : "flex",
                           display: category.image ? "flex" : "flex",
                        }}
                     >
                        {category.title.slice(0, 1)}
                     </div>
                  </div>

                  {/* Bottom box */}
                  <div
                     className={styles.bottom_box}
                     style={{
                        backgroundColor: theme.background,
                        justifyContent: category.description ? "flex-start" : "center",
                     }}
                  >
                     <p style={{ color: theme.text.shade1 }}>{category.title}</p>
                     <p style={{ color: theme.text.shade2 }}>{sliceText(category.description, 40, true)}</p>

                     {/* Bottom date and important label */}
                     {category.isImportant && <span className={styles.important_label}>important</span>}

                     <div className={styles.date_box} style={{ color: theme.text.shade1 }}>
                        <IconCalendar color={theme.text.shade1} size={15} />
                        {getFormattedDate(category.updatedAt, "Do MMM")}
                     </div>
                  </div>
               </div>
            </Link>

            <div className={styles.menu_cont}>
               <CategoryCardMenu
                  title={category.title}
                  onDelete={handleDeleteCategoryClick}
                  onEdit={handleEditCategoryClick}
               />
            </div>
         </div>
      </Menu>
   );

   /**
    * ------------------
    *       Modal
    * ------------------
    */

   function openCategoryDeleteModal(title: string, id: string) {
      modals.openConfirmModal({
         title: `Delete ${title}`,
         centered: true,
         children: (
            <Text size="sm">
               Are you absolutely certain you wish to proceed with the deletion of this category? Please be aware that
               this action is irreversible and will result in the loss of all links contained within it.
            </Text>
         ),
         labels: { confirm: "Delete category", cancel: "No don't delete it" },
         confirmProps: { color: "red" },
         onConfirm: () => mutation.mutate(),
      });
   }
}

/**
 * -----------------
 *       Types
 * -----------------
 */

interface Props {
   category: Category;
   onEdit?: (id: string) => void;
}
