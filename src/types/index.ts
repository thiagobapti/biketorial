export type Part = {
  id: string;
  label: string;
  price: number;
  id_category?: string;
  category_label?: string;
  quantity_available?: number;
  quantity_sold?: number;
  highlight?: boolean;
  description?: string;
  customPrice?: number;
};

export type Category = {
  id: string;
  label: string;
  order?: number;
};

export type PurchaseItem = {
  id?: string;
  price: number;
  fulfilled: boolean;
  parts?: Part[];
  id_builder?: string;
  label?: string;
};

export type Restriction = {
  id_part: string;
  id_part_incompatible: string;
  details: string | null;
};

export type CartContext = {
  items: any[];
  totalPrice: number;
  updateItems: (items: any[]) => void;
  append: (item: any) => void;
  remove: (item: any) => void;
};
