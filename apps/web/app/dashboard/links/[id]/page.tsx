"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { DashboardSlotHeader } from "../../../../components/layout/dashboard-header/dashboard-header";
import { useTheme } from "../../../../hooks/use-theme";
import { IconArrowLeft } from "@tabler/icons-react";
import { Category, Link as LinkType } from "@marked/types";

import DUMMY_CATEGORY from "../../../../data/dummy-categories.json";
import { CategoryLink } from "../../../../components/ui/category-card/category-link";
import { Loader } from "@mantine/core";

export default function CategoryLinksPage() {
   const [loading, setLoading] = useState(true);
   const [category, setCategory] = useState<Category | null>(null);
   const { theme } = useTheme();
   const router = useRouter();
   const path = usePathname();
   const id = extractDashboardId(path);

   useEffect(() => {
      const categoryById = DUMMY_CATEGORY.find((c) => c.id === id);
      if (categoryById) setCategory(categoryById);
      setLoading(false);
   }, []);

   if (loading) return <Loader />;

   return (
      <div>
         <DashboardSlotHeader
            title={category?.title || "Links"}
            buttonTitle="Go Back"
            onClick={() => router.back()}
            icon={<IconArrowLeft size={14} color={theme.text.shade3} />}
         />

         <div>
            {category?.links.length! > 0 ? (
               category?.links.map((link: LinkType) => (
                  <CategoryLink link={link} />
               ))
            ) : (
               <p>No Links added yet</p>
            )}
         </div>
      </div>
   );
}

function extractDashboardId(path: string): string | null {
   const regex = /\/dashboard\/links\/(\d+)/;
   const match = path.match(regex) || null;
   return match ? match[1] : null;
}
