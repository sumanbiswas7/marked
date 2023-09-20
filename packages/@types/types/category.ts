import { Link } from "./link";

export interface Category {
   id: string;
   title: string;
   description: string | null;
   isImportant: boolean;
   createdAt: string;
   updatedAt: string;
   image: string | null;
   color: string | null;
   links: Link[];
   userId: string;
}
