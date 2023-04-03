export type Tag = string | number;

export interface INote {
  id: string;
  tags: Tag[];
  text: string;
}
