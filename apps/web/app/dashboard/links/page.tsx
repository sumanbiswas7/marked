"use client";

import styles from "./links.module.scss";
import { useState } from "react";
import { Grid } from "@mantine/core";
import { CategoryCard } from "../../../components/ui/category-card/category-card";
import { DashboardSlotHeader } from "../../../components/layout/dashboard-header/dashboard-header";
import { Category } from "@marked/types";
import { useDisclosure } from "@mantine/hooks";
import DUMMY_CATEGORIES from "../../../data/dummy-categories.json";
import { AddEditCategoryModal } from "../../../components/form/add-edit-category-modal/add-edit-category-modal";
import { IconPlus } from "@tabler/icons-react";
import { useTheme } from "../../../hooks/use-theme";

export default function DashboardLinksPage(): JSX.Element {
   const { theme } = useTheme();
   const [openedAdd, { open: openAdd, close: closeAdd }] = useDisclosure(false);
   const [openedEdit, { open: openEdit, close: closeEdit }] =
      useDisclosure(false);
   const [editModalData, setEditModalData] = useState<Category | null>(null);

   function handleOpenEditModal(id: string) {
      const data = DUMMY_CATEGORIES.find((c) => c.id === id);
      if (!data) return;
      setEditModalData(data);
      openEdit();
   }

   return (
      <div>
         <DashboardSlotHeader
            title="Categories"
            buttonTitle="Add New"
            onClick={openAdd}
            icon={<IconPlus size={14} color={theme.text.shade3} />}
         />

         {/* Small to mid - 2 cols, mid to lg - 3 cols, more than lg - 4 cols */}
         <Grid>
            {DUMMY_CATEGORIES.map((category: Category) => {
               return (
                  <Grid.Col sm={6} md={4} lg={3}>
                     <CategoryCard
                        category={category}
                        onEdit={handleOpenEditModal}
                     />
                  </Grid.Col>
               );
            })}
         </Grid>

         {/* Add and Edit Category Modal */}
         <AddEditCategoryModal opened={openedAdd} close={closeAdd} />
         <AddEditCategoryModal
            opened={openedEdit}
            close={closeEdit}
            isEdit
            data={editModalData!}
         />
      </div>
   );
}
