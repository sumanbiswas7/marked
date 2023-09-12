import { Menu, Text } from "@mantine/core";
import { IconSettings, IconTrash, IconAlarm } from "@tabler/icons-react";
import { COLORS } from "../../theme/colors";
import { modals } from "@mantine/modals";

export function CategoryCardMenu({ title, onDelete }: Props) {
   return (
      <div>
         <Menu.Dropdown>
            <Menu.Label>Category Options</Menu.Label>
            <Menu.Item
               icon={<IconSettings size={14} color={COLORS.textSwatch} />}
            >
               Edit Category
            </Menu.Item>
            <Menu.Item icon={<IconAlarm size={15} color={COLORS.textSwatch} />}>
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
}
