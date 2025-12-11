export const getDiscountRate = (category: string) => {
  if (category.toLowerCase().includes("jewel")) return 0.1;
  if (category.toLowerCase().includes("men")) return 0.3;
  return 0;
};

export const applyDiscount = (price: number, category: string) => {
  const rate = getDiscountRate(category);
  return +(price * (1 - rate)).toFixed(2);
};
