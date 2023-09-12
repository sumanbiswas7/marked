import { Menu, Button, Text } from "@mantine/core";
import {
   IconSettings,
   IconSearch,
   IconPhoto,
   IconMessageCircle,
   IconTrash,
   IconArrowsLeftRight,
} from "@tabler/icons-react";

export function CategoryCardMenu({ title }: Props) {
   return (
      <div>
         <Menu.Dropdown>
            <Menu.Label>Category Options</Menu.Label>
            <Menu.Item icon={<IconSettings size={14} />}>
               Edit Category
            </Menu.Item>
            <Menu.Item icon={<IconMessageCircle size={14} />}>
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
