import { useState, useEffect } from "react";

import { getCategories } from "../api/fakeStoreApi";
import { ALL_CATEGORIES } from "../constants";

const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    getCategories()
      .then((data: string[]) => {
        setCategories([ALL_CATEGORIES, ...data]);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, []);

  return categories;
};

export default useCategories;
