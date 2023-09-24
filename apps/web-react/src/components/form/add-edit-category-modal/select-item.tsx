import { Box } from "@mantine/core";

import { forwardRef } from "react";
import { Group, Text } from "@mantine/core";

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
   image: string;
   label: string;
   description: string;
}

export const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
   ({ color, label, description, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
         <Group noWrap>
            <Box
               sx={{
                  backgroundColor: color,
                  width: 25,
                  height: 25,
                  borderRadius: 5,
               }}
            />
            <div>
               <Text size="sm">{label}</Text>
               {/* <Text size="xs" opacity={0.65}>
                   {description}
                </Text> */}
            </div>
         </Group>
      </div>
   )
);

export const data = [
   {
      color: "#FFCEAA",
      label: "#FFCEAA",
      value: "#FFCEAA",
      description: "Light Orange",
   },
   {
      color: "#A7F294",
      label: "#A7F294",
      value: "#A7F294",
      description: "Light Green",
   },
   {
      color: "#AAD6FF",
      label: "#AAD6FF",
      value: "#AAD6FF",
      description: "Light Blue",
   },
   {
      color: "#FFAAAA",
      label: "#FFAAAA",
      value: "#FFAAAA",
      description: "Light Red",
   },
];
