import { useState, useEffect } from "react";

import { getCategories } from "../api/fakeStoreApi";
import { ALL_CATEGORIES } from "../constants";

const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getCategories()
      .then((data: string[]) => {
        setCategories([ALL_CATEGORIES, ...data]);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { categories, isLoading };
};

export default useCategories;
