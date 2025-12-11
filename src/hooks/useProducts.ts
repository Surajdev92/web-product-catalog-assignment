import { useState, useEffect, useMemo } from "react";

import { getAllProducts } from "../api/fakeStoreApi";
import type { IProduct } from "../types/product";
import { applyDiscount } from "../utils/discount";
import { ALL_CATEGORIES, SORT_TYPES, type SortType } from "../constants";

const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>(ALL_CATEGORIES);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<SortType>(SORT_TYPES.PRICE_ASC);

  useEffect(() => {
    getAllProducts().then((data: IProduct[]) => {
      setProducts(data);
      if (data.length > 0) {
        const prices = data.map((p) => p.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        setPriceRange([min, max]);
      }
    });
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered: IProduct[] = [...products];

    // 1) filter by selectedCategory (if not "All categories")
    if (selectedCategory !== ALL_CATEGORIES) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // 2) filter by priceRange (apply on original price)
    filtered = filtered.filter((p) => {
      const discountedPrice =
        selectedCategory === ALL_CATEGORIES
          ? applyDiscount(p.price, p.category)
          : p.price;
      return (
        discountedPrice >= priceRange[0] && discountedPrice <= priceRange[1]
      );
    });

    // 3) compute discounted price only when category is 'All categories' (for sorting)
    // 4) sort by sortBy
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === SORT_TYPES.PRICE_ASC) {
        return a.price - b.price;
      }
      if (sortBy === SORT_TYPES.PRICE_DESC) {
        return b.price - a.price;
      }
      if (sortBy === SORT_TYPES.DISCOUNT) {
        // Discount sort only applies when "All categories" selected
        if (selectedCategory === ALL_CATEGORIES) {
          const discountedPriceA = applyDiscount(a.price, a.category);
          const discountedPriceB = applyDiscount(b.price, b.category);
          return discountedPriceA - discountedPriceB;
        }
        return 0;
      }
      return 0;
    });

    return filtered;
  }, [products, selectedCategory, priceRange, sortBy]);

  return {
    products,
    filteredProducts,
    setSelectedCategory,
    setPriceRange,
    setSortBy,
    priceRange,
    selectedCategory,
    sortBy,
  };
};

export default useProducts;
