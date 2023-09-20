import { Modal, TextInput, Flex, Select, Switch, LoadingOverlay, FileInput, Button } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { SelectItem, data as selectData } from "./select-item";
import { useLayoutEffect, useState } from "react";
import { Category } from "@marked/types";
import { updateCategory, validateUpdateCategory } from "../../../api/category/update-category";
import { successNotification, warnNotification } from "../../../utils/show-notifications";

export function AddEditCategoryModal({ opened, isEdit, close, data }: Props) {
   const [uploading, setUploading] = useState(false);
   const [img, setImg] = useState<ImgState>({ file: null, preview: null });
   const [form, setForm] = useState<Category>({
      color: "",
      date: "",
      description: "",
      id: "",
      image: "",
      isImportant: false,
      title: "",
      links: [],
   });

   /**
    * ----------------------------
    *          Handlers
    * ----------------------------
    */
   async function handleSubmit() {
      if (!form.id) return;

      const data = {};
      if (form.title) data["title"] = form.title;
      if (form.color) data["color"] = form.color;
      if (form.image) data["image"] = form.image;
      if (form.description) data["description"] = form.description;
      if (form.isImportant) data["isImportant"] = form.isImportant;

      const error = validateUpdateCategory(data);
      if (error) return warnNotification(error);
      setUploading(true);
      const res = await updateCategory(form.id, data);
      setUploading(false);
      if (res.isError) return warnNotification(res.message!);

      return successNotification(`Category Updated successfully`);
   }

   function handleFormChange(key: keyof typeof form, value: string) {
      setForm((prevForm) => ({ ...prevForm, [key]: value }));
   }

   function handleImgChange(file: File) {
      if (!file) return setImg({ file: null, preview: null });
      const preview = URL.createObjectURL(file);
      setImg({ file, preview: preview });
   }

   useLayoutEffect(() => {
      if (isEdit && data) setForm(data);
      if (img.preview) setImg({ file: null, preview: null });
   }, [data]);

   return (
      <>
         <LoadingOverlay visible={uploading} />

         <Modal opened={opened} onClose={close} title={isEdit ? "Edit Category" : "Add new Category"} centered>
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
            {/* REVIEW: Hide cover image upload for now */}
            {/* <FileInput
               label="Cover image"
               placeholder="Add Cover Image"
               icon={<IconUpload size={14} />}
               mb={"sm"}
               accept="image/png,image/jpeg"
               onChange={handleImgChange}
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
                  backgroundImage: img.preview ? `url(${img.preview})` : form.image ? `url(${form.image})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "#ced4da",
                  fontSize: "0.8rem",
               }}
            >
               {!form.image && !img.preview && "Cover Image Preview"}
            </Flex> */}

            <Switch
               labelPosition="left"
               label="Add an important label with the catetgory"
               // description="Adds an important tag with the category"
               mb={"md"}
               checked={form.isImportant}
               onChange={(e) => handleFormChange("isImportant", e.currentTarget.checked as any)}
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

interface ImgState {
   file: File | null;
   preview: string | null;
}
