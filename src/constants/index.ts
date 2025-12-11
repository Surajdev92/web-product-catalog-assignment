// Category Constants
export const ALL_CATEGORIES = "All categories";

// Sort Type Constants
export const SORT_TYPES = {
  PRICE_ASC: "PRICE_ASC",
  PRICE_DESC: "PRICE_DESC",
  DISCOUNT: "DISCOUNT",
};

export type SortType = (typeof SORT_TYPES)[keyof typeof SORT_TYPES];

// Sort Option Labels
export const SORT_LABELS = {
  PRICE_ASC: "Price: Low → High",
  PRICE_DESC: "Price: High → Low",
  DISCOUNT: "Discount",
};

// Tab Constants
export const TABS = {
  SORTING: "sorting",
  FILTERING: "filtering",
};

export type TabType = (typeof TABS)[keyof typeof TABS];

// UI Labels
export const LABELS = {
  SORT_BY: "Sort by:",
  PRICE_RANGE: "Price Range:",
  QUANTITY: "Quantity:",
  DESCRIPTION: "Description:",
  ADD_TO_CART: "Add to Cart",
  ALL_CATEGORIES_HEADING: "All categories",
};

// Messages
export const MESSAGES = {
  DISCOUNT_SORT_REQUIRES_ALL_CATEGORIES:
    'Discount sorting requires "All categories" to be selected',
  DISCOUNT_SORT_UNAVAILABLE:
    "Discount sorting is only available when 'All categories' is selected",
};
