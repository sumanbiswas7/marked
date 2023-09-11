import { COLORS } from "../../../theme/colors";
import { lightenHexColor } from "../../../utils/lighten-hexcol";
import styles from "./category-card.module.scss";

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
         </div>

         <div
            className={styles.bottom_box}
            style={{ justifyContent: description ? "flex-start" : "center" }}
         >
            <p style={{ color: COLORS.textSwatch }}>{title}</p>
            <p style={{ color: COLORS.textLightSwatch }}>{description}</p>

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
