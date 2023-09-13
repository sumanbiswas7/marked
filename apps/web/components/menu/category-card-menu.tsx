import { Menu } from "@mantine/core";
import { IconSettings, IconTrash, IconAlarm } from "@tabler/icons-react";
import { THEME } from "../../theme/colors";

export function CategoryCardMenu({
   title,
   onDelete,
   onAddReminder,
   onEdit,
}: Props) {
   return (
      <div>
         <Menu.Dropdown>
            <Menu.Label>Category Options</Menu.Label>
            <Menu.Item
               icon={<IconSettings size={14} color={THEME.text.shade1} />}
               onClick={onEdit}
            >
               Edit Category
            </Menu.Item>
            <Menu.Item
               icon={
                  <IconAlarm
                     size={15}
                     color={THEME.text.shade1}
                     onClick={onAddReminder}
                  />
               }
            >
               Add Reminder
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item
               color="red"
               icon={<IconTrash size={14} />}
               onClick={onDelete}
            >
               Delete Category
            </Menu.Item>
         </Menu.Dropdown>
      </div>
   );
}

/**
 * ----------------
 *     Types
 * ----------------
 */
interface Props {
   title?: string;
   onDelete?: () => void;
   onEdit?: () => void;
   onAddReminder?: () => void;
}
