import { Modal, TextInput, LoadingOverlay, Button } from "@mantine/core";
import { useState } from "react";
import { Link as LinkType } from "@marked/types";
import { successNotification, warnNotification } from "../../../utils/show-notifications";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../provider/tanstack-provider";
import { validateLink } from "../../../api/link/validate-link";
import { addNewLink } from "../../../api/link/create-link";
import { sliceText } from "../../../utils/slice-text";
import { HttpResponse } from "@marked/utils";

export function AddNewLinkModal({ opened, isEdit, close, categoryId, onSubmitEnd }: Props) {
   const [uploading, setUploading] = useState(false);
   const [form, setForm] = useState<LinkType>({
      createdAt: "",
      link: "",
      title: "",
      id: "",
      updatedAtt: "",
      categoryId: "",
   });

   const mutation = useMutation({
      mutationFn: (data: any) => addNewLink(data),
      onSuccess: onMutationSuccesss,
      onError: onMutationError,
   });

   async function onMutationSuccesss() {
      queryClient.invalidateQueries({ queryKey: [`links`, categoryId] });
      //   wait 500ms for state update
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUploading(false);
      if (onSubmitEnd) onSubmitEnd();
      successNotification(`Link ${isEdit ? "Updated" : "Added"} successfully`);
   }

   function onMutationError(e: HttpResponse) {
      setUploading(false);
      if (onSubmitEnd) onSubmitEnd();
      const slicedMsg = sliceText(e.message, 45, true);
      warnNotification(slicedMsg || "Opps! something went wrong");
   }

   /**
    * ----------------------------
    *          Handlers
    * ----------------------------
    */

   async function handleSubmit() {
      const data = {};
      if (form.title) data["title"] = form.title;
      if (form.link) data["link"] = form.link;
      data["categoryId"] = categoryId;

      formCreateSubmit();

      // Helpers
      async function formCreateSubmit() {
         const error = validateLink(data, "create");
         if (error) return warnNotification(error);
         setUploading(true);
         mutation.mutate(data);
      }
   }

   function handleFormChange(key: keyof typeof form, value: string) {
      setForm((prevForm) => ({ ...prevForm, [key]: value }));
   }

   return (
      <>
         <LoadingOverlay visible={uploading} />

         <Modal opened={opened} onClose={close} title={isEdit ? "Edit Link" : "Add new Link"} centered>
            <TextInput
               placeholder="Chatgpt"
               label="Title"
               value={form.title || ""}
               onChange={(e) => handleFormChange("title", e.target.value)}
            />
            <TextInput
               withAsterisk
               label="Link"
               placeholder="https://chat.openai.com"
               mb={"md"}
               value={form.link!}
               onChange={(e) => handleFormChange("link", e.target.value)}
            />

            <Button fullWidth onClick={handleSubmit}>
               {isEdit ? "Done" : "Add Link"}
            </Button>
         </Modal>
      </>
   );
}

/**
 * -----------------
 *      Types
 * -----------------
 */
interface Props {
   opened: boolean;
   close: () => void;
   isEdit?: boolean;
   categoryId: string;
   onSubmitEnd?: () => void;
}
