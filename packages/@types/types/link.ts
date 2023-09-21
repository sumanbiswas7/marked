import { Category } from "./category";

export interface Link {
   id: string;
   createdAt: string;
   updatedAtt: string;
   title: string | null;
   link: string;
   categoryId: string;
   category?: Category;
}
