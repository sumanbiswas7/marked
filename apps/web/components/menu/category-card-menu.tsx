import { Menu, Button, Text } from "@mantine/core";
import {
   IconSettings,
   IconMessageCircle,
   IconTrash,
   IconAlarm,
} from "@tabler/icons-react";
import { COLORS } from "../../theme/colors";

export function CategoryCardMenu({ title }: Props) {
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

            <Menu.Item color="red" icon={<IconTrash size={14} />}>
               Delete Category
            </Menu.Item>
         </Menu.Dropdown>
      </div>
   );
}

interface Props {
   title?: string;
}
