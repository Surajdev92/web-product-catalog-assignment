import { useState, useEffect, useMemo } from "react";

import { getAllProducts } from "../api/fakeStoreApi";
import type { IProduct } from "../types/product";
import { applyDiscount } from "../utils/discount";

const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All categories");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<"PRICE_ASC" | "PRICE_DESC" | "DISCOUNT">(
    "PRICE_ASC"
  );

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
    if (selectedCategory !== "All categories") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // 2) filter by priceRange (apply on original price)
    filtered = filtered.filter((p) => {
      const discountedPrice =
        selectedCategory === "All categories"
          ? applyDiscount(p.price, p.category)
          : p.price;
      return (
        discountedPrice >= priceRange[0] && discountedPrice <= priceRange[1]
      );
    });

    // 3) compute discounted price only when category is 'All categories' (for sorting)
    // 4) sort by sortBy
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === "PRICE_ASC") {
        return a.price - b.price;
      }
      if (sortBy === "PRICE_DESC") {
        return b.price - a.price;
      }
      if (sortBy === "DISCOUNT") {
        // Discount sort only applies when "All categories" selected
        if (selectedCategory === "All categories") {
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
  };
};

export default useProducts;
