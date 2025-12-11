const BASE = "https://fakestoreapi.com";

async function request(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export const getAllProducts = () => request(`${BASE}/products`);
export const getCategories = () => request(`${BASE}/products/categories`);
export const getProductsByCategory = (category: string) =>
  request(`${BASE}/products/category/${encodeURIComponent(category)}`);
