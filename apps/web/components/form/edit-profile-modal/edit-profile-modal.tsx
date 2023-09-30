import { ChangeEvent, useState } from "react";
import { updateSocialLink } from "../../../api/social/add-social-link";
import { errorNotification } from "../../../utils/show-notifications";
import { HttpResponse, isValidUrl } from "@marked/utils";
import { Button, LoadingOverlay, Modal, TextInput } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { Social } from "@marked/types";
import styles from "./edit-profile-modal.module.scss";
import { UserMe } from "../../provider/auth-user-provider";

export function EditProfileModal({ close, opened, onSubmitEnd, data }: EditProfileModalProps) {
   const [loading, setLoading] = useState(false);
   const [image, setImage] = useState<ImageState>({
      file: null,
      preview: null,
   });

   const [form, setForm] = useState({
      name: null,
      username: null,
      about: null,
   });

   async function handleSubmit() {}

   function handleFormChange(key: keyof typeof form, value: string | null) {
      setForm((prevForm) => ({ ...prevForm, [key]: value }));
   }

   function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
      const imageFile = e.target.files?.[0] || null;
      if (!imageFile) return;
      const preview = URL.createObjectURL(imageFile);
      setImage({ file: imageFile, preview });
   }

   return (
      <>
         <LoadingOverlay visible={loading} />

         <Modal opened={opened} onClose={close} title={"Edit Profile"} centered>
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
      </>
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
