"use client";

import { useAuthUser } from "../../hooks/use-auth-user";
import styles from "./profile.module.scss";
import { motion } from "framer-motion";
import { SocialTheme, socialThemes } from "../../constants/social-themes";
import { PoweredBy } from "../../components/ui/bio/powered-by/powered-by";
import { SocialLinks } from "../../components/ui/bio/social-links/social-links";
import { useTheme } from "../../hooks/use-theme";
import { useDisclosure } from "@mantine/hooks";
import { HttpResponse } from "@marked/utils";
import { errorNotification, successNotification } from "../../utils/show-notifications";
import { SocialLinkModal } from "../../components/form/edit-social-links-modal/edit-social-links-modal";
import { IconEdit } from "@tabler/icons-react";
import { EditProfileModal } from "../../components/form/edit-profile-modal/edit-profile-modal";
import { AddOtherLinkModal } from "../../components/form/add-other-link-modal/add-other-link-modal";

export default function ProfilePage() {
   const { error, loading, user, revalidate } = useAuthUser();
   const { theme: webTheme } = useTheme();
   const [openedSocial, { open: openSocial, close: closeSocial }] = useDisclosure(false);
   const [openedProfile, { open: openProfile, close: closeProfile }] = useDisclosure(false);
   const [openedOther, { open: openOther, close: closeOther }] = useDisclosure(false);

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error </p>;

   // Change theme here
   const theme: SocialTheme = socialThemes["milk"];
   const otherLinksArr = user?.social?.other || [];

   async function handleSubmitEnd(res: HttpResponse) {
      await revalidate();

      if (res.isError) errorNotification(res.message || "Something went wrong");
      else successNotification(res.message || "Operation Successful");

      closeProfile();
      closeSocial();
      closeOther();
   }

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
                  <h1 style={{ color: theme.text }}>
                     {user?.name}{" "}
                     <span>
                        <IconEdit size={18} color={theme.text} onClick={openProfile} />
                     </span>
                  </h1>

                  {user?.about && <p style={{ color: theme.description }}>{user?.about}</p>}
                  {user?.social !== null && (
                     <SocialLinks theme={theme} editButton={true} data={user?.social || null} onAddNew={openSocial} />
                  )}
               </div>
               {/* Other Links */}
               <div className={styles.other_links_cont}>
                  {/* Add new Link Button*/}
                  {user?.social !== null ? (
                     <motion.button
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className={styles.link}
                        style={{ backgroundColor: webTheme.accent, color: webTheme.text.shade3 }}
                        onClick={openOther}
                     >
                        Add New Link
                     </motion.button>
                  ) : (
                     <motion.button
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className={styles.link}
                        style={{ backgroundColor: webTheme.accent, color: webTheme.text.shade3 }}
                        onClick={openSocial}
                     >
                        Add Link
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
               <PoweredBy theme={theme} views={user?.views || 0} />
            </div>
         </div>

         {/* Modals */}
         <EditProfileModal opened={openedProfile} close={closeProfile} data={user} onSubmitEnd={handleSubmitEnd} />
         <AddOtherLinkModal
            opened={openedOther}
            close={closeOther}
            onSubmitEnd={handleSubmitEnd}
            socialId={user?.social?.id || "N/A"}
         />
         <SocialLinkModal
            opened={openedSocial}
            close={closeSocial}
            onSubmitEnd={handleSubmitEnd}
            data={user?.social || null}
         />
      </>
   );
}
