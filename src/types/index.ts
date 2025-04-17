export type PurchaseItem = {
  id?: string;
  price: number;
  fulfilled: boolean;
  parts?: Part[];
  // categories?: Category[];
  id_builder?: string;
  label?: string;
};

export type Restriction = {
  id_part: string;
  id_part_incompatible: string;
  details: string | null;
};

export type Build = {
  id: string;
  label: string;
  // features: Feature[];
  // image?: string;
};

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
  // features?: Category[] | any[];

  // selected: boolean;
  // disabled?: boolean;
  // base_price?: number;
  // priceValue?: number;
  // currentPriceRecord?: any;
  // restrictions?: Restriction[];
  // pricing?: Array<{
  //   price: number;
  //   base_price: number;
  //   id_related_part: string | null;
  // }>;
};

// Category represents a group classification for features
export type Category = {
  id: string;
  label: string;
  order?: number;
};

// // Feature represents a customizable aspect of the bike
// export type Feature = {
//   id: string;
//   label: string;
//   category: Category;
//   parts: Part[];
// };

// // Cart item for storing builder configurations
// export type CartItem = {
//   builder: Builder;
//   price: number;
//   selectedParts: Part[];
// };
