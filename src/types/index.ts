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
  pricing?: {
    price: number;
    id_related_part: string;
  }[];
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
  image?: string;
};

export type Restriction = {
  id_part: string;
  id_part_incompatible: string;
  details: string | null;
};

export type CartContext = {
  items: PurchaseItem[];
  totalPrice: number;
  isOpen: boolean;
  updateItems: (items: PurchaseItem[]) => void;
  append: (item: PurchaseItem) => void;
  remove: (item: PurchaseItem) => void;
  setIsOpen: (isOpen: boolean) => void;
  toggleCartDrawer: () => void;
};

export type GlobalContext = {
  modalText: string;
  workingText: string;
  setModalText: (text: string) => void;
  setWorkingText: (text: string) => void;
};
