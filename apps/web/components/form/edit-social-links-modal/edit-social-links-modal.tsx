import { useState } from "react";
import { updateSocialLink } from "../../../api/social/add-social-link";
import { errorNotification } from "../../../utils/show-notifications";
import { HttpResponse, isValidUrl } from "@marked/utils";
import { Button, LoadingOverlay, Modal, TextInput } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { Social } from "@marked/types";

export function SocialLinkModal({ close, opened, onSubmitEnd, data }: SocialLinkModalProps) {
   const [loading, setLoading] = useState(false);
   const [form, setForm] = useState({
      github: data?.github || null,
      facebook: data?.facebook || null,
      instagram: data?.instagram || null,
      leetcode: data?.leetcode || null,
      linkedin: data?.linkedin || null,
      portfolio: data?.portfolio || null,
      snapchat: data?.snapchat || null,
      tiktok: data?.tiktok || null,
      twitter: data?.twitter || null,
      youtube: data?.youtube || null,
   });

   async function handleSubmit() {
      try {
         for (const key in form) {
            if (form[key] && isValidUrl(form[key]) === false) return errorNotification("Please enter a valid link");
         }
         setLoading(true);
         const res = await updateSocialLink(form);
         setLoading(false);
         if (onSubmitEnd) onSubmitEnd(res);
      } catch (error) {
         setLoading(false);
         const err = error?.response?.data as HttpResponse;
         errorNotification(err.message || "Something wen't wrong can't call api");
      }
   }

   function handleFormChange(key: keyof typeof form, value: string | null) {
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
               rightSection={
                  <IconTrash
                     color="#F36C6C"
                     size={17}
                     style={{ display: form.github ? undefined : "none" }}
                     onClick={(e) => handleFormChange("github", null)}
                  />
               }
            />
            <TextInput
               placeholder="https://www.facebook.com/johndoe"
               label="Facebook"
               value={form.facebook || ""}
               onChange={(e) => handleFormChange("facebook", e.target.value)}
               rightSection={
                  <IconTrash
                     color="#F36C6C"
                     size={17}
                     style={{ display: form.facebook ? undefined : "none" }}
                     onClick={(e) => handleFormChange("facebook", null)}
                  />
               }
            />
            <TextInput
               placeholder="https://www.instagram.com/sumanbiswas7"
               label="Instagram"
               value={form.instagram || ""}
               onChange={(e) => handleFormChange("instagram", e.target.value)}
               rightSection={
                  <IconTrash
                     color="#F36C6C"
                     size={17}
                     style={{ display: form.instagram ? undefined : "none" }}
                     onClick={(e) => handleFormChange("instagram", null)}
                  />
               }
            />
            <TextInput
               placeholder="https://www.linkedin.com/in/sumanbiswas7"
               label="Linkedin"
               value={form.linkedin || ""}
               onChange={(e) => handleFormChange("linkedin", e.target.value)}
               rightSection={
                  <IconTrash
                     color="#F36C6C"
                     size={17}
                     style={{ display: form.linkedin ? undefined : "none" }}
                     onClick={(e) => handleFormChange("linkedin", null)}
                  />
               }
            />
            <TextInput
               placeholder="https://leetcode.com/sumanbiswas7"
               label="Leetcode"
               value={form.leetcode || ""}
               onChange={(e) => handleFormChange("leetcode", e.target.value)}
               rightSection={
                  <IconTrash
                     color="#F36C6C"
                     size={17}
                     style={{ display: form.leetcode ? undefined : "none" }}
                     onClick={(e) => handleFormChange("leetcode", null)}
                  />
               }
            />
            <TextInput
               placeholder="https://sumanbiswas.vercel.app"
               label="Portfolio"
               value={form.portfolio || ""}
               onChange={(e) => handleFormChange("portfolio", e.target.value)}
               rightSection={
                  <IconTrash
                     color="#F36C6C"
                     size={17}
                     style={{ display: form.portfolio ? undefined : "none" }}
                     onClick={(e) => handleFormChange("portfolio", null)}
                  />
               }
            />
            <TextInput
               placeholder="https://www.snapchat.com/johndoe"
               label="Snapchat"
               value={form.snapchat || ""}
               onChange={(e) => handleFormChange("snapchat", e.target.value)}
               rightSection={
                  <IconTrash
                     color="#F36C6C"
                     size={17}
                     style={{ display: form.snapchat ? undefined : "none" }}
                     onClick={(e) => handleFormChange("snapchat", null)}
                  />
               }
            />
            <TextInput
               placeholder="https://twitter.com/johndoe"
               label="Twitter"
               value={form.twitter || ""}
               onChange={(e) => handleFormChange("twitter", e.target.value)}
               rightSection={
                  <IconTrash
                     color="#F36C6C"
                     size={17}
                     style={{ display: form.twitter ? undefined : "none" }}
                     onClick={(e) => handleFormChange("twitter", null)}
                  />
               }
            />
            <TextInput
               placeholder="https://tiktok.com/johndoe"
               label="Tiktok"
               value={form.tiktok || ""}
               onChange={(e) => handleFormChange("tiktok", e.target.value)}
               rightSection={
                  <IconTrash
                     color="#F36C6C"
                     size={17}
                     style={{ display: form.tiktok ? undefined : "none" }}
                     onClick={(e) => handleFormChange("tiktok", null)}
                  />
               }
            />
            <TextInput
               placeholder="https://youtube.com/johndoe"
               label="Yoututbe"
               value={form.youtube || ""}
               onChange={(e) => handleFormChange("youtube", e.target.value)}
               rightSection={
                  <IconTrash
                     color="#F36C6C"
                     size={17}
                     style={{ display: form.youtube ? undefined : "none" }}
                     onClick={(e) => handleFormChange("youtube", null)}
                  />
               }
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
   data: Social | null;
   onSubmitEnd?: (res: HttpResponse) => void;
}
