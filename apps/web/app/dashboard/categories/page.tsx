"use client";

import styles from "./links.module.scss";
import { useEffect, useState } from "react";
import { Grid, Loader } from "@mantine/core";
import { CategoryCard } from "../../../components/ui/category-card/category-card";
import { DashboardSlotHeader } from "../../../components/layout/dashboard-header/dashboard-header";
import { Category } from "@marked/types";
import { useDisclosure } from "@mantine/hooks";
import { AddEditCategoryModal } from "../../../components/form/add-edit-category-modal/add-edit-category-modal";
import { IconPlus } from "@tabler/icons-react";
import { useTheme } from "../../../hooks/use-theme";
import { NoData } from "../../../components/ui/empty-state/no-data";
import { useQuery, type QueryResponse } from "../../../hooks/use-query";
import { getAllCategory } from "../../../api/category/get-all-category";
import DUMMY_CATEGORIES from "../../../data/dummy-categories.json";
import { setToken } from "../../../utils/get-token";

export default function DashboardLinksPage(): JSX.Element {
   const { theme } = useTheme();
   const [openedAdd, { open: openAdd, close: closeAdd }] = useDisclosure(false);
   const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
   const [editModalData, setEditModalData] = useState<Category | null>(null);
   const { data, error, loading }: QueryResponse<CategoryRes> = useQuery(getAllCategory);

   // REVIEW: DELETE ME
   useEffect(() => {
      setToken(
         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQwYjMxNWNhLWFiOWYtNDE5Yi05Njk4LTcyZWJhNzRiYjdkNSIsImVtYWlsIjoic3VtYXpuYUB3d3gueG8iLCJpYXQiOjE2OTUwNTYxNzEsImV4cCI6MTY5NzY0ODE3MX0.lFd2tFxdx_uXQu6rEvAxjyGWnx8IXVkLGLpsdLg7ONQ"
      );
   }, []);

   function handleOpenEditModal(id: string) {
      const filtered = data?.categories?.find((c) => c.id === id);
      if (!filtered) return;
      setEditModalData(filtered);
      openEdit();
   }

   if (loading) return <Loader />;
   if (error) return <p>{error}</p>;

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
            {data?.categories && data?.categories?.length > 0 ? (
               <>
                  {data?.categories?.map((category: Category) => {
                     return (
                        <Grid.Col sm={6} md={4} lg={3}>
                           <CategoryCard category={category} onEdit={handleOpenEditModal} />
                        </Grid.Col>
                     );
                  })}
               </>
            ) : (
               <NoData
                  title="No Categories found"
                  description="You haven’t saved any links yet , add a category first then save links init"
                  img="/empty-states/no-data.png"
               />
            )}
         </Grid>

         {/* Add and Edit Category Modal */}
         <AddEditCategoryModal opened={openedAdd} close={closeAdd} />
         <AddEditCategoryModal opened={openedEdit} close={closeEdit} isEdit data={editModalData!} />
      </div>
   );
}

interface CategoryRes {
   categories: Category[];
}
