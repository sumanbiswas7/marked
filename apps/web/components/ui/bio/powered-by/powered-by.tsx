import { IconEye } from "@tabler/icons-react";
import styles from "./powered-by.module.scss";
import { SocialTheme } from "../../../../constants/social-themes";

export function PoweredBy({ theme, views }: Props) {
   return (
      <div className={styles.bottom_powered_by_cont} style={{ color: theme.copyright }}>
         <p>
            Powered by{" "}
            <a href="https://marked-web.vercel.app" target="_blank">
               marked
            </a>
         </p>

         <div className={styles.eye_icon_cont}>
            <IconEye size={17} />
            <span>{views}</span>
         </div>
      </div>
   );
}

interface Props {
   theme: SocialTheme;
   views: number;
}
