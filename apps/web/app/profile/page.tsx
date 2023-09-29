"use client";

import { useAuthUser } from "../../hooks/use-auth-user";
import styles from "./profile.module.scss";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { SocialTheme, socialThemes } from "../../constants/social-themes";
import { PoweredBy } from "../../components/ui/bio/powered-by/powered-by";
import { SocialLinks } from "../../components/ui/bio/social-links/social-links";
import { useTheme } from "../../hooks/use-theme";
import { useDisclosure } from "@mantine/hooks";
import { Button, LoadingOverlay, Modal, TextInput } from "@mantine/core";
import { useState } from "react";
import { Social } from "@marked/types";
import { addSocialLink } from "../../api/social/add-social-link";
import { HttpResponse } from "@marked/utils";
import { errorNotification, successNotification } from "../../utils/show-notifications";

export default function ProfilePage() {
   const { error, loading, user, revalidate } = useAuthUser();
   const { theme: webTheme } = useTheme();
   const [openedSocial, { open: openSocial, close: closeSocial }] = useDisclosure(false);

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error </p>;

   // Change theme here
   const theme: SocialTheme = socialThemes["milk"];
   const otherLinksArr = user?.social?.other || [];

   async function handleSocialSubmitEnd(res: HttpResponse) {
      await revalidate();

      if (res.isError) errorNotification(res.message || "Something went wrong");
      else successNotification(res.message || "Links updated");

      closeSocial();
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
                  <h1 style={{ color: theme.text }}>{user?.name}</h1>
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

         <SocialLinkModal opened={openedSocial} close={closeSocial} onSubmitEnd={handleSocialSubmitEnd} />
      </>
   );
}

function SocialLinkModal({ close, opened, onSubmitEnd }: SocialLinkModalProps) {
   const [loading, setLoading] = useState(false);
   const [form, setForm] = useState({
      github: null,
      facebook: null,
      instagram: null,
      leetcode: null,
      linkedin: null,
      portfolio: null,
      snapchat: null,
      tiktok: null,
      twitter: null,
      youtube: null,
   });

   async function handleSubmit() {
      try {
         setLoading(true);
         const res = await addSocialLink(form);
         setLoading(false);
         if (onSubmitEnd) onSubmitEnd(res);
      } catch (error) {
         setLoading(false);
         const err = error?.response?.data as HttpResponse;
         errorNotification(err.message || "Something wen't wrong can't call api");
      }
   }

   function handleFormChange(key: keyof typeof form, value: string) {
      setForm((prevForm) => ({ ...prevForm, [key]: value }));
   }

   return (
      <>
         <LoadingOverlay visible={loading} />

         <Modal opened={opened} onClose={close} title={"Edit Social Media Links"} centered>
            <TextInput
               placeholder="https://github.com/sumanbiswas7"
               label="Github"
               value={form.github || ""}
               onChange={(e) => handleFormChange("github", e.target.value)}
            />
            <TextInput
               placeholder="https://www.facebook.com/johndoe"
               label="Facebook"
               value={form.facebook || ""}
               onChange={(e) => handleFormChange("facebook", e.target.value)}
            />
            <TextInput
               placeholder="https://www.instagram.com/sumanbiswas7"
               label="Instagram"
               value={form.instagram || ""}
               onChange={(e) => handleFormChange("instagram", e.target.value)}
            />
            <TextInput
               placeholder="https://www.linkedin.com/in/sumanbiswas7"
               label="Linkedin"
               value={form.linkedin || ""}
               onChange={(e) => handleFormChange("linkedin", e.target.value)}
            />
            <TextInput
               placeholder="https://leetcode.com/sumanbiswas7"
               label="Leetcode"
               value={form.leetcode || ""}
               onChange={(e) => handleFormChange("leetcode", e.target.value)}
            />
            <TextInput
               placeholder="https://sumanbiswas.vercel.app"
               label="Portfolio"
               value={form.portfolio || ""}
               onChange={(e) => handleFormChange("portfolio", e.target.value)}
            />
            <TextInput
               placeholder="https://www.snapchat.com/johndoe"
               label="Snapchat"
               value={form.snapchat || ""}
               onChange={(e) => handleFormChange("snapchat", e.target.value)}
            />
            <TextInput
               placeholder="https://twitter.com/johndoe"
               label="Twitter"
               value={form.twitter || ""}
               onChange={(e) => handleFormChange("twitter", e.target.value)}
            />
            <TextInput
               placeholder="https://tiktok.com/johndoe"
               label="Tiktok"
               value={form.tiktok || ""}
               onChange={(e) => handleFormChange("tiktok", e.target.value)}
            />
            <TextInput
               placeholder="https://youtube.com/johndoe"
               label="Yoututbe"
               value={form.youtube || ""}
               onChange={(e) => handleFormChange("youtube", e.target.value)}
            />

            <Button mt={"md"} fullWidth onClick={handleSubmit}>
               Save
            </Button>
         </Modal>
      </>
   );
}

interface SocialLinkModalProps {
   opened: boolean;
   close: () => void;
   onSubmitEnd?: (res: HttpResponse) => void;
}
