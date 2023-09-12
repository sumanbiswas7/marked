import { Menu } from "@mantine/core";
import { COLORS } from "../../../theme/colors";
import { lightenHexColor } from "../../../utils/lighten-hexcol";
import { sliceText } from "../../../utils/slice-text";
import { CategoryCardMenu } from "../../menu/category-card-menu";
import styles from "./category-card.module.scss";
import { OptionButton } from "./option-button";

export function CategoryCard({
   date,
   title,
   bgCol,
   bgImg,
   description,
   impotant,
}: Props): JSX.Element {
   const style = bgCol
      ? { backgroundColor: bgCol }
      : { backgroundImage: `url(${bgImg})` };

   const lightenBgCol = lightenHexColor(bgCol || "#000", 50);

   return (
      <Menu>
         <div style={{ position: "relative" }}>
            <div
               className={styles.container}
               style={{ borderColor: COLORS.textSwatch }}
            >
               <div className={styles.top_box} style={style}>
                  <div
                     style={{
                        color: COLORS.textSwatch,
                        backgroundColor: lightenBgCol,
                        display: bgImg && "none",
                     }}
                  >
                     {title.slice(0, 1)}
                  </div>
                  <Menu.Target>
                     <OptionButton />
                  </Menu.Target>
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
               <CategoryCardMenu title={title} />
            </div>
         </div>
      </Menu>
   );
}

interface Props {
   title: string;
   date: string;
   bgImg?: string;
   bgCol?: string;
   description?: string;
   impotant?: boolean;
}
