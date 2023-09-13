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
import { SelectItem, data } from "./select-item";

export function AddEditCategoryModal({ opened, isEdit, close }: Props) {
   return (
      <Modal
         opened={opened}
         onClose={close}
         title={isEdit ? "Edit Category" : "Add new Category"}
         centered
      >
         {/* <LoadingOverlay visible /> */}

         <Flex gap={"sm"} mb="sm">
            <TextInput placeholder="Free AI Tools" required label="Title" />
            <Select
               label="Color"
               data={data}
               placeholder="Choose one color"
               dropdownPosition="bottom"
               itemComponent={SelectItem}
            />
         </Flex>
         <TextInput
            label="Description"
            placeholder="Links of some of the free ai tools"
            mb={"sm"}
         />

         <FileInput
            label="Cover photo"
            placeholder="Add Cover photo"
            icon={<IconUpload size={14} />}
            mb={"md"}
            accept="image/png,image/jpeg"
         />

         <Switch
            labelPosition="left"
            label="Add an important label with the catetgory"
            // description="Adds an important tag with the category"
            mb={"md"}
         />

         <Button fullWidth>Add Category</Button>
      </Modal>
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
}
