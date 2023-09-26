"use client";

import styles from "./category-link.module.scss";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { DashboardSlotHeader } from "../../../../components/layout/dashboard-header/dashboard-header";
import { useTheme } from "../../../../hooks/use-theme";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import { Link as LinkType } from "@marked/types";

import { CategoryLink } from "../../../../components/ui/category-card/category-link";
import { NoData } from "../../../../components/ui/empty-state/no-data";

import { CircleButton } from "../../../../components/ui/button/circle-button";
import { useQuery } from "@tanstack/react-query";
import { getAllLinks } from "../../../../api/link/get-all-links";
import { useDisclosure } from "@mantine/hooks";
import { AddNewLinkModal } from "../../../../components/form/add-link-modal/add-link-modal";

export default function CategoryLinksPage() {
   const [loading, setLoading] = useState(true);
   const { theme } = useTheme();
   const router = useRouter();
   const params = useParams();
   const id = params.id as string;
   const [opened, { open, close }] = useDisclosure(false);
   const { data, status } = useQuery({ queryKey: [`links`, id], queryFn: () => getAllLinks(id) });

   if (status === "loading") return <span>Loading...</span>;
   if (status === "error") return <span>Error: {data?.message}</span>;
   const links = ((data?.data as any)?.links as LinkType[]) || [];

   return (
      <div>
         <DashboardSlotHeader
            title={links[0]?.category?.title || "Links"}
            description={links[0]?.category?.description || "Description..."}
            buttonTitle="Go Back"
            onClick={() => router.back()}
            icon={<IconArrowLeft size={14} color={theme.text.shade3} />}
         />

         <div>
            {links.length! > 0 ? (
               links.map((link) => <CategoryLink link={link} />)
            ) : (
               <NoData
                  title="No Links Added"
                  description="You haven’t saved any links yet , add a link by clicking add button"
                  img="/empty-states/no-data.png"
                  buttonTitle="Add Link"
                  onClick={open}
               />
            )}
         </div>

         <CircleButton onClick={open} icon={<IconPlus size={25} color={theme.text.shade3} />} />

         {/* Modal */}
         <AddNewLinkModal opened={opened} close={close} onSubmitEnd={close} isEdit={false} categoryId={id} />
      </div>
   );
}
