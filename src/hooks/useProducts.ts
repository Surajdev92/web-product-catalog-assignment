import { useState, useEffect, useMemo } from "react";

import { getAllProducts } from "../api/fakeStoreApi";
import type { IProduct } from "../types/product";
import { applyDiscount, getDiscountAmount } from "../utils/discount";
import { ALL_CATEGORIES, SORT_TYPES, type SortType } from "../constants";

const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] =
    useState<string>(ALL_CATEGORIES);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<SortType>(SORT_TYPES.PRICE_ASC);

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        if (isMounted) {
          setProducts(data);
          if (data.length > 0) {
            const prices = data.map((p: IProduct) => p.price);
            const min = Math.min(...prices);
            const max = Math.max(...prices);
            setPriceRange([min, max]);
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Show loading when filtering/sorting changes
  useEffect(() => {
    if (!isLoading && products.length > 0) {
      const timer = setTimeout(() => {
        setIsFiltering(true);
        setTimeout(() => {
          setIsFiltering(false);
        }, 200);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedCategory, priceRange, sortBy, isLoading, products.length]);

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
        // Sort by discount amount (highest discount first, then lower, then no discount)
        if (selectedCategory === ALL_CATEGORIES) {
          const discountAmountA = getDiscountAmount(a.price, a.category);
          const discountAmountB = getDiscountAmount(b.price, b.category);
          return discountAmountB - discountAmountA;
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
    isLoading,
    isFiltering,
  };
};

export default useProducts;
