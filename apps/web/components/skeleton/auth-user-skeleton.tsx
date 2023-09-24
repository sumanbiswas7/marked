import { Flex, Skeleton } from "@mantine/core";

export function AuthUserSkeleton() {
   return (
      <Flex justify={"center"} direction={"column"} align={"center"} sx={{ padding: 20 }}>
         <Skeleton height={40} circle mb={"sm"} />
         <Skeleton height={8} radius="xl" />
         <Skeleton height={8} mt={6} radius="xl" />
      </Flex>
   );
}
