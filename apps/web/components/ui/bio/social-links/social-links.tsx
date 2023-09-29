import { IconBrandFacebook, IconBrandTiktok, IconBrandTwitter, IconPlus } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { SocialTheme } from "../../../../constants/social-themes";
import styles from "./social-links.module.scss";
import { Social } from "@marked/types";

export function SocialLinks({ theme, editButton, data }: SocialLinksProps) {
   const iconColor = theme.icon.fill;
   const iconBgColor = theme.icon.backgdound;

   return (
      <div className={styles.social_cont}>
         {data?.facebook && (
            <motion.a
               target="_blank"
               href={data.facebook}
               style={{ backgroundColor: iconBgColor }}
               whileHover={{ rotate: 25 }}
               whileTap={{ scale: 0.9 }}
            >
               <IconBrandFacebook color={iconColor} />
            </motion.a>
         )}
         {data?.tiktok && (
            <motion.a
               target="_blank"
               href={data.tiktok}
               style={{ backgroundColor: iconBgColor }}
               whileHover={{ rotate: 25 }}
               whileTap={{ scale: 0.9 }}
            >
               <IconBrandTiktok color={iconColor} />
            </motion.a>
         )}
         {data?.twitter && (
            <motion.a
               target="_blank"
               href={data.twitter}
               style={{ backgroundColor: iconBgColor }}
               whileHover={{ rotate: 25 }}
               whileTap={{ scale: 0.9 }}
            >
               <IconBrandTwitter color={iconColor} />
            </motion.a>
         )}

         {editButton && (
            <motion.button style={{ backgroundColor: iconColor }} whileHover={{ rotate: 25 }} whileTap={{ scale: 0.9 }}>
               <IconPlus color={iconBgColor} />
            </motion.button>
         )}
      </div>
   );
}

interface SocialLinksProps {
   theme: SocialTheme;
   editButton?: boolean;
   data: Social | null;
}
