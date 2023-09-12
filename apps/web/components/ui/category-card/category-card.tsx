import { Menu, Text } from "@mantine/core";
import { COLORS } from "../../../theme/colors";
import { lightenHexColor } from "../../../utils/lighten-hexcol";
import { sliceText } from "../../../utils/slice-text";
import { CategoryCardMenu } from "../../menu/category-card-menu";
import styles from "./category-card.module.scss";
import { OptionButton } from "./option-button";
import { useState } from "react";
import { modals } from "@mantine/modals";

export function CategoryCard({
   date,
   title,
   bgCol,
   bgImg,
   description,
   impotant,
}: Props): JSX.Element {
   const [menu, setMenu] = useState(false);

   const style = bgCol
      ? { backgroundColor: bgCol }
      : { backgroundImage: `url(${bgImg})` };

   const lightenBgCol = lightenHexColor(bgCol || "#000", 50);

   function handleDeleteCategoryClick() {
      setMenu(false);
      openCategoryDeleteModal(title);
   }

   return (
      <Menu opened={menu} shadow="md">
         <div style={{ position: "relative" }} className={styles.main_div}>
            <div
               className={styles.container}
               style={{ borderColor: COLORS.textSwatch }}
            >
               <div className={styles.top_box} style={style}>
                  <div
                     style={{
                        color: COLORS.textSwatch,
                        backgroundColor: lightenBgCol,
                        // display: bgImg ? "none" : "block",
                     }}
                  >
                     {title.slice(0, 1)}
                  </div>

                  <OptionButton onClick={() => setMenu(!menu)} opened={menu} />
               </div>

               <div
                  className={styles.bottom_box}
                  style={{
                     justifyContent: description ? "flex-start" : "center",
                  }}
               >
                  <p style={{ color: COLORS.textSwatch }}>{title}</p>
                  <p style={{ color: COLORS.textLightSwatch }}>
                     {sliceText(description, 40, true)}
                  </p>

                  {/* Bottom date and important label */}
                  {impotant && (
                     <span
                        className={styles.important_label}
                        //   style={{ backgroundColor: COLORS.red }}
                     >
                        important
                     </span>
                  )}

                  <div className={styles.date_box}>
                     <span>
                        <img
                           src="/category_card/calendar.svg"
                           style={{ marginTop: -1 }}
                        />
                     </span>
                     {date}
                  </div>
               </div>
            </div>

            <div className={styles.menu_cont}>
               <CategoryCardMenu
                  title={title}
                  onDelete={handleDeleteCategoryClick}
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
   title: string;
   date: string;
   bgImg: string | null;
   bgCol: string | null;
   description?: string | null;
   impotant?: boolean;
}
