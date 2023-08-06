export interface Note {
  _id: string;
  title: string;
  text?: string;
  from?: string;
  to?: string;
  createdAt: string;
  updatedAt: string;
}
