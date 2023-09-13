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

export default function DashboardLinksPage(): JSX.Element {
   const [opened, { open, close }] = useDisclosure(false);

   return (
      <div>
         <DashboardSlotHeader
            title="Categories"
            buttonTitle="Add New"
            onClick={open}
         />

         {/* Small to mid - 2 cols, mid to lg - 3 cols, more than lg - 4 cols */}
         <Grid>
            {DUMMY_CATEGORIES.map((c: Category) => {
               return (
                  <Grid.Col sm={6} md={4} lg={3}>
                     <CategoryCard
                        key={c.id}
                        title={c.title}
                        date={c.date}
                        bgCol={c.color}
                        description={c.description}
                        impotant={c.isImportant}
                        bgImg={c.image}
                     />
                  </Grid.Col>
               );
            })}
         </Grid>

         {/* Add or Edit Category Modal */}
         <AddEditCategoryModal opened={opened} close={close} />
      </div>
   );
}
