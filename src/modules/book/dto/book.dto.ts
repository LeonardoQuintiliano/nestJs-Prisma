export type BookDTO = {
  id: string;
  name: string;
  description: string;
  author: string;
  bar_code: string;
  ownerId?: string | null;
  createdAt: Date;
  updatedAt: Date;
};