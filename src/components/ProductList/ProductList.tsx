import type { IProduct } from "../../types/product";
import ProductCard from "./ProductCard";

interface IProductListProps {
  products: IProduct[];
  showDiscount: boolean;
}

const ProductList = ({ products, showDiscount }: IProductListProps) => {
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
