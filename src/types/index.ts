export type PurchaseItem = {
  id?: string;
  price: number;
  fullfilled: boolean;
  item?: Part | Build;
  categories?: Category[];
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
  // selected: boolean;
  // disabled?: boolean;
  // price?: number;
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
