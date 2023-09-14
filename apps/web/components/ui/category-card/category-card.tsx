"use client";

import { Menu, Text } from "@mantine/core";
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

export function CategoryCard({ category, onEdit }: Props): JSX.Element {
   const [menu, setMenu] = useState(false);
   const { theme } = useTheme();

   const bgColStyle = { backgroundColor: category.color! };
   const bgImgStyle = { backgroundImage: `url(${category.image})` };

   const lightenBgCol = lightenHexColor(category.color || "#000", 50);

   function handleDeleteCategoryClick() {
      setMenu(false);
      openCategoryDeleteModal(category.title);
   }

   function handleEditCategoryClick() {
      setMenu(false);
      if (onEdit) onEdit(category.id);
   }

   return (
      <Menu opened={menu} shadow="md">
         <div style={{ position: "relative" }} className={styles.main_div}>
            <div
               className={styles.container}
               style={{
                  borderColor:
                     theme.colorScheme === "dark"
                        ? theme.border.shade1
                        : theme.accent,
               }}
            >
               <div
                  className={styles.top_box}
                  style={category.image ? bgImgStyle : bgColStyle}
               >
                  <div
                     style={{
                        color:
                           theme.colorScheme === "dark"
                              ? theme.background
                              : theme.text.shade1,
                        backgroundColor: lightenBgCol || "#4d4d4d",
                        display: category.image ? "none" : "flex",
                     }}
                  >
                     {category.title.slice(0, 1)}
                  </div>

                  <OptionButton onClick={() => setMenu(!menu)} opened={menu} />
               </div>

               {/* Bottom box */}
               <div
                  className={styles.bottom_box}
                  style={{
                     backgroundColor: theme.background,
                     justifyContent: category.description
                        ? "flex-start"
                        : "center",
                  }}
               >
                  <p style={{ color: theme.text.shade1 }}>{category.title}</p>
                  <p style={{ color: theme.text.shade2 }}>
                     {sliceText(category.description, 40, true)}
                  </p>

                  {/* Bottom date and important label */}
                  {category.isImportant && (
                     <span className={styles.important_label}>important</span>
                  )}

                  <div
                     className={styles.date_box}
                     style={{ color: theme.text.shade1 }}
                  >
                     <IconCalendar color={theme.text.shade1} size={15} />
                     {category.date}
                  </div>
               </div>
            </div>

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
}

function openCategoryDeleteModal(title?: string) {
   modals.openConfirmModal({
      title: `Delete ${title}`,
      centered: true,
      children: (
         <Text size="sm">
            Are you absolutely certain you wish to proceed with the deletion of
            this category? Please be aware that this action is irreversible and
            will result in the loss of all links contained within it.
         </Text>
      ),
      labels: { confirm: "Delete category", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
   });
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
