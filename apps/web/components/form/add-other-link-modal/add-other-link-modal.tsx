import { useState } from "react";
import { errorNotification } from "../../../utils/show-notifications";
import { HttpResponse, isValidUrl } from "@marked/utils";
import { Button, LoadingOverlay, Modal, TextInput } from "@mantine/core";
import { addOtherSocialLink } from "../../../utils/api/social/add-other-social-link";

export function AddOtherLinkModal({ close, opened, onSubmitEnd, socialId }: EditProfileModalProps) {
   const [loading, setLoading] = useState(false);
   const [form, setForm] = useState({
      title: null,
      link: null,
   });

   async function handleSubmit() {
      try {
         if (!form.title) return errorNotification("Title is required");
         if (!form.link) return errorNotification("Link is required");
         if (isValidUrl(form.link) === false) return errorNotification("Given link is not valid");

         setLoading(true);
         const res = await addOtherSocialLink({ ...form, socialId });

         res.message = "Link added successfully";
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
      <Modal opened={opened} onClose={close} title={"Add new Link"} centered>
         <LoadingOverlay visible={loading} />

         <TextInput
            placeholder="My Resume"
            label="Title"
            value={form.title || ""}
            onChange={(e) => handleFormChange("title", e.target.value)}
            required
         />

         <TextInput
            placeholder="https://drive.google.com/AJBYDSYAD"
            label="Link"
            value={form.link || ""}
            onChange={(e) => handleFormChange("link", e.target.value)}
            required
         />

         <Button mt={"md"} fullWidth onClick={handleSubmit}>
            Add Link
         </Button>
      </Modal>
   );
}

/**
 * --------------
 *     Types
 * --------------
 */
interface EditProfileModalProps {
   opened: boolean;
   close: () => void;
   onSubmitEnd?: (res: HttpResponse) => void;
   socialId: string;
}
