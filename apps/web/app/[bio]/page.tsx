"use client";

import { useParams } from "next/navigation";
import styles from "./bio.module.scss";
import { motion } from "framer-motion";
import { SocialTheme, socialThemes } from "../../constants/social-themes";
import { PoweredBy } from "../../components/ui/bio/powered-by/powered-by";
import { SocialLinks } from "../../components/ui/bio/social-links/social-links";
import { useTheme } from "../../hooks/use-theme";
import { useQuery } from "@tanstack/react-query";
import { getBioFromEmail } from "../../api/user/get-bio";
import { User } from "@marked/types";

export default function BioPage({ isEdit }: Props) {
   const params = useParams();
   const email = params.bio as string;
   const { theme: webTheme } = useTheme();
   const { data, status } = useQuery({
      queryKey: ["bio"],
      queryFn: () => getBioFromEmail(email),
      enabled: email ? true : false,
   });

   if (!isEdit && status === "loading") return <p>Loading...</p>;
   if (!isEdit && status === "error") return <p>Error </p>;

   // Change theme here
   const theme: SocialTheme = socialThemes["milk"];
   const user = (data?.data as any).user as User;
   const otherLinksArr = user.social?.other || [{ name: "Marked", link: "/" }];

   return (
      <>
         <div className={styles.main}>
            <div
               className={styles.content}
               style={{
                  background: `linear-gradient(117deg, ${theme.background.gradient[0]} 0%, ${theme.background.gradient[1]} 100%)`,
               }}
            />
         </div>

         <div className={styles.content_center}>
            <div className={styles.content_container}>
               {/* Profile and Social Media */}
               <div className={styles.top_container}>
                  <img src={user.image || "/sidenav/no-profile.jpg"} alt={`${user.name}.png`} />
                  <h1 style={{ color: theme.text }}>{user.name}</h1>
                  {user.about && <p style={{ color: theme.description }}>{user.about}</p>}

                  <SocialLinks theme={theme} editButton={isEdit} data={user.social} />
               </div>
               {/* Other Links */}
               <div className={styles.other_links_cont}>
                  {/* Add new Link Button*/}
                  {isEdit && (
                     <motion.button
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className={styles.link}
                        style={{ backgroundColor: webTheme.accent, color: webTheme.text.shade3 }}
                     >
                        Add New Link
                     </motion.button>
                  )}
                  {otherLinksArr.map((link) => (
                     <motion.a
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className={styles.link}
                        href={link.link}
                        target="_blank"
                        style={{
                           backgroundColor: theme.card.background,
                           color: theme.text,
                           borderColor: theme.card.border,
                        }}
                     >
                        {link.name}
                     </motion.a>
                  ))}
               </div>
               {!isEdit && <PoweredBy theme={theme} views={user.views} />}
            </div>
         </div>
      </>
   );
}

interface Props {
   isEdit?: boolean;
}
