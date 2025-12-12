const BASE_URL = "https://fakestoreapi.com";

const request = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

export const getAllProducts = () => request(`${BASE_URL}/products`);
export const getCategories = () => request(`${BASE_URL}/products/categories`);
export const getProductsByCategory = (category: string) =>
  request(`${BASE_URL}/products/category/${encodeURIComponent(category)}`);
