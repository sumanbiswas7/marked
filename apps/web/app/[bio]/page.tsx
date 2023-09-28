"use client";

import { useParams } from "next/navigation";
import styles from "./bio.module.scss";
import { useEffect } from "react";
import { isValidEmail } from "@marked/utils";
import { errorNotification } from "../../utils/show-notifications";
import DUMMY_SOCIAL from "../../data/dummy-social.json";
import { IconBrandFacebook, IconBrandTiktok, IconBrandTwitter, IconEye } from "@tabler/icons-react";
import { motion } from "framer-motion";

export default function BioPage() {
   const params = useParams();
   const email = params.bio as string;

   useEffect(() => {
      getBioFromEmail();
   }, []);

   function getBioFromEmail() {
      if (isValidEmail(email) === false) return errorNotification(`Given user "${email}" is not valid`);
   }

   return (
      <>
         <div className={styles.main}>
            <div className={styles.content} />
         </div>

         <div className={styles.content_center}>
            <div className={styles.content_container}>
               {/* Profile and Social Media */}
               <div className={styles.top_container}>
                  <img src="/bio/me.png" alt="Suman Biswas.png" />
                  <h1 style={{ color: "#000000" }}>Suman Biswas</h1>
                  <p style={{ color: "#9F9F9F" }}>FullStack App and Web Developer</p>
                  <SocialLinks />
               </div>
               {/* Other Links */}
               <div className={styles.other_links_cont}>
                  {DUMMY_SOCIAL.other.map((link) => (
                     <motion.a
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className={styles.link}
                        href={link.link}
                        target="_blank"
                        style={{ backgroundColor: "#fff", color: "#000", borderColor: "#DBDBDB" }}
                     >
                        {link.title}
                     </motion.a>
                  ))}
               </div>
               {/* Powered by */}
               <div className={styles.bottom_powered_by_cont}>
                  <p>
                     Powered by{" "}
                     <a href="https://marked-web.vercel.app" target="_blank">
                        marked
                     </a>
                  </p>

                  <div className={styles.eye_icon_cont} style={{ color: "#000" }}>
                     <IconEye size={17} />
                     <span>101</span>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

function SocialLinks() {
   const iconColor = "#FFF";
   const iconBgColor = "#616161";

   const data = DUMMY_SOCIAL;

   return (
      <div className={styles.social_cont}>
         {data.facebook && (
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
         {data.tiktok && (
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
         {data.twitter && (
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
      </div>
   );
}

interface SocialLinksProps {
   links: {
      instagram: string;
      github?: string;
      facebook?: string;
      tiktok?: string;
      twitter?: string;
      snapchat?: string;
      leetcode?: string;
      youtube?: string;
      other?: string;
      portfolio?: string;
      linkedin?: string;
   };
}
