import {
   Modal,
   TextInput,
   Flex,
   Select,
   Switch,
   LoadingOverlay,
   FileInput,
   Button,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { SelectItem, data as selectData } from "./select-item";
import { useEffect, useLayoutEffect, useState } from "react";
import { Category } from "@marked/types";

export function AddEditCategoryModal({ opened, isEdit, close, data }: Props) {
   const [uploading, setUploading] = useState(false);

   const [form, setForm] = useState<Category>({
      color: "",
      date: "",
      description: "",
      id: "",
      image: "",
      isImportant: false,
      title: "",
   });

   const img = false;

   async function handleSubmit() {
      setUploading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setUploading(false);

      console.log("SUBMITTING", form);
   }

   useLayoutEffect(() => {
      if (isEdit && data) setForm(data);
   }, [data]);

   function handleFormChange(key: keyof typeof form, value: string) {
      setForm((prevForm) => ({ ...prevForm, [key]: value }));
   }

   return (
      <>
         <LoadingOverlay visible={uploading} />

         <Modal
            opened={opened}
            onClose={close}
            title={isEdit ? "Edit Category" : "Add new Category"}
            centered
         >
            <Flex gap={"sm"} mb="sm">
               <TextInput
                  placeholder="Free AI Tools"
                  required
                  label="Title"
                  value={form.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
               />
               <Select
                  label="Color"
                  data={selectData}
                  placeholder="Choose one color"
                  dropdownPosition="bottom"
                  itemComponent={SelectItem}
                  value={form.color}
                  onChange={(color) => handleFormChange("color", color!)}
               />
            </Flex>
            <TextInput
               label="Description"
               placeholder="Links of some of the free ai tools"
               mb={"sm"}
               value={form.description!}
               onChange={(e) => handleFormChange("description", e.target.value)}
            />

            <FileInput
               label="Cover image"
               placeholder="Add Cover Image"
               icon={<IconUpload size={14} />}
               mb={"sm"}
               accept="image/png,image/jpeg"
            />

            <Flex
               justify={"center"}
               align={"center"}
               mb={"sm"}
               sx={{
                  border: "1px solid #ced4da",
                  borderRadius: 5,
                  width: "100%",
                  height: "5rem",
                  backgroundImage: form.image ? `url(${form.image})` : "none",
                  backgroundSize: "cover",
                  color: "#ced4da",
                  fontSize: "0.8rem",
               }}
            >
               {!form.image && "Cover Image Preview"}
            </Flex>

            <Switch
               labelPosition="left"
               label="Add an important label with the catetgory"
               // description="Adds an important tag with the category"
               mb={"md"}
               checked={form.isImportant}
               onChange={(e) =>
                  handleFormChange(
                     "isImportant",
                     e.currentTarget.checked as any
                  )
               }
            />

            <Button fullWidth onClick={handleSubmit}>
               {isEdit ? "Done" : "Add Category"}
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
   data?: Category;
}
