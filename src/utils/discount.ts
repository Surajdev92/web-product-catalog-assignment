import { DISCOUNT_RULES } from "../constants";

export const getDiscountRate = (category: string): number => {
  const categoryLower = category.toLowerCase();

  for (const [keyword, rate] of Object.entries(DISCOUNT_RULES)) {
    if (categoryLower.includes(keyword.toLowerCase())) {
      return rate;
    }
  }

  return 0;
};

export const applyDiscount = (price: number, category: string): number => {
  const rate = getDiscountRate(category);
  return +(price * (1 - rate)).toFixed(2);
};

export const getDiscountAmount = (price: number, category: string): number => {
  const rate = getDiscountRate(category);
  return price * rate;
};
