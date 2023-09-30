import { ChangeEvent, useState } from "react";
import { updateSocialLink } from "../../../api/social/update-social-link";
import { errorNotification } from "../../../utils/show-notifications";
import { HttpResponse, isValidUrl } from "@marked/utils";
import { Button, LoadingOverlay, Modal, TextInput } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { Social } from "@marked/types";
import styles from "./edit-profile-modal.module.scss";
import { UserMe } from "../../provider/auth-user-provider";
import { updateUserProfile } from "../../../api/user/update-me";

export function EditProfileModal({ close, opened, onSubmitEnd, data }: EditProfileModalProps) {
   const [loading, setLoading] = useState(false);
   const [image, setImage] = useState<ImageState>({
      file: null,
      preview: null,
   });
   const [form, setForm] = useState({
      name: data?.name || null,
      username: data?.username || null,
      about: data?.about || null,
   });

   async function handleSubmit() {
      try {
         if (!form.name) return errorNotification("Name is required");

         setLoading(true);
         const res = await updateUserProfile(form);
         res.message = "Profile updated successfully";
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

   function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
      const imageFile = e.target.files?.[0] || null;
      if (!imageFile) throw new Error("No Image file found");
      const preview = URL.createObjectURL(imageFile);
      setImage({ file: imageFile, preview });
   }

   return (
      <Modal opened={opened} onClose={close} title={"Edit Profile"} centered>
         <LoadingOverlay visible={loading} />
         <input
            id="profile-image"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            style={{ display: "none" }}
            onChange={handleImageChange}
         />
         <label htmlFor="profile-image">
            <img src={image.preview || data?.image || ""} className={styles.preview_img} />
         </label>

         <TextInput
            placeholder="John Doe"
            label="Name"
            value={form.name || ""}
            onChange={(e) => handleFormChange("name", e.target.value)}
            required
         />

         <TextInput
            placeholder="Prompt Engineer"
            label="About"
            value={form.about || ""}
            onChange={(e) => handleFormChange("about", e.target.value)}
         />

         <Button mt={"md"} fullWidth onClick={handleSubmit}>
            Save
         </Button>
      </Modal>
   );
}

interface EditProfileModalProps {
   opened: boolean;
   close: () => void;
   onSubmitEnd?: (res: HttpResponse) => void;
   data: UserMe | null;
}

interface ImageState {
   file: File | null;
   preview: null | string;
}
