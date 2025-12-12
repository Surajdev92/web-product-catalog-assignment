import type { IProduct } from "../../types/product";
import ProductCard from "./ProductCard";
import Spinner from "../Spinner/Spinner";

interface IProductListProps {
  products: IProduct[];
  showDiscount: boolean;
  isLoading?: boolean;
  isFiltering?: boolean;
}

const ProductList = ({
  products,
  showDiscount,
  isLoading = false,
  isFiltering = false,
}: IProductListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (isFiltering) {
    return (
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-50 pointer-events-none">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showDiscount={showDiscount}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="bg-white bg-opacity-90 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
            <Spinner size="md" />
            <p className="text-gray-700 font-medium">Filtering products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-600 text-lg">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          showDiscount={showDiscount}
        />
      ))}
    </div>
  );
};

export default ProductList;
