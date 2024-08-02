import { Category } from "./category";

export interface Note {
    id: number;
    title: string;
    content: string;
    category: Category;
    tags: string;
  }