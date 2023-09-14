import { Link } from "./link";

export interface Category {
   id: string;
   title: string;
   description: string | null;
   isImportant: boolean;
   date: string;
   image: string | null;
   color: string | null;
   links: Link[];
}
