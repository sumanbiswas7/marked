"use client";

import { useAuthUser } from "../../hooks/use-auth-user";
import styles from "./profile.module.scss";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { SocialTheme, socialThemes } from "../../constants/social-themes";
import { PoweredBy } from "../../components/ui/bio/powered-by/powered-by";
import { SocialLinks } from "../../components/ui/bio/social-links/social-links";
import { useTheme } from "../../hooks/use-theme";

export default function ProfilePage() {
   const { error, loading, user } = useAuthUser();
   const { theme: webTheme } = useTheme();

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error </p>;

   // Change theme here
   const theme: SocialTheme = socialThemes["milk"];
   const otherLinksArr = user?.social?.other || [];

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
                  <img src={user?.image || "/sidenav/no-profile.jpg"} alt={`${user?.name}.png`} />
                  <h1 style={{ color: theme.text }}>{user?.name}</h1>
                  {user?.about && <p style={{ color: theme.description }}>{user?.about}</p>}
                  <SocialLinks theme={theme} editButton={true} data={user?.social || null} />
               </div>
               {/* Other Links */}
               <div className={styles.other_links_cont}>
                  {/* Add new Link Button*/}
                  <motion.button
                     whileHover={{ x: 5 }}
                     whileTap={{ scale: 0.9 }}
                     className={styles.link}
                     style={{ backgroundColor: webTheme.accent, color: webTheme.text.shade3 }}
                  >
                     Add New Link
                  </motion.button>
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
               <PoweredBy theme={theme} views={user?.views || 0} />
            </div>
         </div>
      </>
   );
}

interface Props {}
