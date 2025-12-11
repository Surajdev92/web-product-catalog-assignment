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
        const productsData = await getAllProducts();
        if (isMounted) {
          setProducts(productsData);
          if (productsData.length > 0) {
            const productPrices = productsData.map(
              (product: IProduct) => product.price
            );
            const minPrice = Math.min(...productPrices);
            const maxPrice = Math.max(...productPrices);
            setPriceRange([minPrice, maxPrice]);
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
    let filteredProducts: IProduct[] = [...products];

    // 1) filter by selectedCategory (if not "All categories")
    if (selectedCategory !== ALL_CATEGORIES) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // 2) filter by priceRange (apply on original price)
    filteredProducts = filteredProducts.filter((product) => {
      const priceToCheck =
        selectedCategory === ALL_CATEGORIES
          ? applyDiscount(product.price, product.category)
          : product.price;
      return priceToCheck >= priceRange[0] && priceToCheck <= priceRange[1];
    });

    // 3) compute discounted price only when category is 'All categories' (for sorting)
    // 4) sort by sortBy
    filteredProducts = [...filteredProducts].sort((productA, productB) => {
      if (sortBy === SORT_TYPES.PRICE_ASC) {
        return productA.price - productB.price;
      }
      if (sortBy === SORT_TYPES.PRICE_DESC) {
        return productB.price - productA.price;
      }
      if (sortBy === SORT_TYPES.DISCOUNT) {
        // Discount sort only applies when "All categories" selected
        // Sort by discount amount (highest discount first, then lower, then no discount)
        if (selectedCategory === ALL_CATEGORIES) {
          const productADiscountAmount = getDiscountAmount(
            productA.price,
            productA.category
          );
          const productBDiscountAmount = getDiscountAmount(
            productB.price,
            productB.category
          );
          return productBDiscountAmount - productADiscountAmount;
        }
        return 0;
      }
      return 0;
    });

    return filteredProducts;
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
