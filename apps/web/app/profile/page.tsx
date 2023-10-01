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
import { errorNotification, successNotification, warnNotification } from "../../utils/show-notifications";
import { SocialLinkModal } from "../../components/form/edit-social-links-modal/edit-social-links-modal";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { EditProfileModal } from "../../components/form/edit-profile-modal/edit-profile-modal";
import { AddOtherLinkModal } from "../../components/form/add-other-link-modal/add-other-link-modal";
import { Flex, LoadingOverlay, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { OtherLink } from "@marked/types/dist/types/types/user";
import { deleteOtherSocialLinkById } from "../../utils/api/social/delete-other-social-link";
import { useState } from "react";
import { isValidImageUrl } from "../../utils/valid-image";

export default function ProfilePage() {
   const [deleteing, setDeleting] = useState(false);
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

   async function handleDeleteLink(link: OtherLink) {
      try {
         setDeleting(true);
         const res = await deleteOtherSocialLinkById(link.id);
         await revalidate();
         setDeleting(false);
         if (res.isError) errorNotification(res.message || "Something went wrong while deleting");
         else warnNotification("Link deleted");
      } catch (error) {
         const err = error.response.data as HttpResponse;
         errorNotification(err.message || "Unable to delete link");
         setDeleting(false);
      }
   }

   return (
      <>
         <LoadingOverlay visible={deleteing} />
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
                  <img
                     src={isValidImageUrl(user?.image!) ? user?.image || "" : "/sidenav/no-profile.jpg"}
                     alt={`${user?.name}.png`}
                  />
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
                     <Flex sx={{ alignItems: "center", gap: "0.5rem" }}>
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

                        <span>
                           <IconTrash color="#F36C6C" size={20} onClick={() => openOtherLinkConfirmModal(link)} />
                        </span>
                     </Flex>
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

   /**
    * ------------------
    *       Modal
    * ------------------
    */

   function openOtherLinkConfirmModal(link: OtherLink) {
      modals.openConfirmModal({
         title: `Confirm Delete Link`,
         centered: true,
         children: (
            <>
               <Text size="sm">Are you absolutely certain you wish to proceed with the deletion of this link? .</Text>
               <Text color="red">{link.link}</Text>{" "}
            </>
         ),
         labels: { confirm: "Delete Link", cancel: "No don't delete it" },
         confirmProps: { color: "red" },
         onConfirm: () => handleDeleteLink(link),
      });
   }
}
