import {
   IconBrandFacebook,
   IconBrandGithub,
   IconBrandInstagram,
   IconBrandLeetcode,
   IconBrandLinkedin,
   IconBrandSnapchat,
   IconBrandTiktok,
   IconBrandTwitter,
   IconBrandYoutube,
   IconCompass,
   IconEdit,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { SocialTheme } from "../../../../constants/social-themes";
import styles from "./social-links.module.scss";
import { Social } from "@marked/types";

export function SocialLinks({ theme, editButton, data, onAddNew }: SocialLinksProps) {
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
         {data?.github && (
            <motion.a
               target="_blank"
               href={data.github}
               style={{ backgroundColor: iconBgColor }}
               whileHover={{ rotate: 25 }}
               whileTap={{ scale: 0.9 }}
            >
               <IconBrandGithub color={iconColor} />
            </motion.a>
         )}
         {data?.instagram && (
            <motion.a
               target="_blank"
               href={data.instagram}
               style={{ backgroundColor: iconBgColor }}
               whileHover={{ rotate: 25 }}
               whileTap={{ scale: 0.9 }}
            >
               <IconBrandInstagram color={iconColor} />
            </motion.a>
         )}
         {data?.leetcode && (
            <motion.a
               target="_blank"
               href={data.leetcode}
               style={{ backgroundColor: iconBgColor }}
               whileHover={{ rotate: 25 }}
               whileTap={{ scale: 0.9 }}
            >
               <IconBrandLeetcode color={iconColor} />
            </motion.a>
         )}
         {data?.linkedin && (
            <motion.a
               target="_blank"
               href={data.linkedin}
               style={{ backgroundColor: iconBgColor }}
               whileHover={{ rotate: 25 }}
               whileTap={{ scale: 0.9 }}
            >
               <IconBrandLinkedin color={iconColor} />
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
         {data?.portfolio && (
            <motion.a
               target="_blank"
               href={data.portfolio}
               style={{ backgroundColor: iconBgColor }}
               whileHover={{ rotate: 25 }}
               whileTap={{ scale: 0.9 }}
            >
               <IconCompass color={iconColor} />
            </motion.a>
         )}
         {data?.snapchat && (
            <motion.a
               target="_blank"
               href={data.snapchat}
               style={{ backgroundColor: iconBgColor }}
               whileHover={{ rotate: 25 }}
               whileTap={{ scale: 0.9 }}
            >
               <IconBrandSnapchat color={iconColor} />
            </motion.a>
         )}
         {data?.youtube && (
            <motion.a
               target="_blank"
               href={data.youtube}
               style={{ backgroundColor: iconBgColor }}
               whileHover={{ rotate: 25 }}
               whileTap={{ scale: 0.9 }}
            >
               <IconBrandYoutube color={iconColor} />
            </motion.a>
         )}

         {editButton && (
            <motion.button
               onClick={onAddNew}
               style={{ backgroundColor: iconColor }}
               whileHover={{ rotate: 25 }}
               whileTap={{ scale: 0.9 }}
            >
               <IconEdit color={iconBgColor} />
            </motion.button>
         )}
      </div>
   );
}

interface SocialLinksProps {
   theme: SocialTheme;
   editButton?: boolean;
   data: Social | null;
   onAddNew?: () => void;
}
