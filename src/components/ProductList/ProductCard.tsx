import type { IProduct } from "../../types/product";
import { applyDiscount, getDiscountRate } from "../../utils/discount";
import { LABELS } from "../../constants";

interface IProductCardProps {
  product: IProduct;
  showDiscount: boolean;
}

const ProductCard = ({ product, showDiscount }: IProductCardProps) => {
  const discountedPrice = showDiscount
    ? applyDiscount(product.price, product.category)
    : null;
  const hasDiscount = showDiscount && discountedPrice !== product.price;

  // Check if product qualifies for discount (regardless of showDiscount)
  const discountRate = getDiscountRate(product.category);
  const hasDiscountPotential = discountRate > 0;
  const discountPercentage = Math.round(discountRate * 100);

  const truncateDescription = (
    descriptionText: string,
    maxLength: number = 100
  ) => {
    if (descriptionText.length <= maxLength) return descriptionText;
    return descriptionText.substring(0, maxLength).trim() + "...";
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-sm border border-gray-300 flex flex-col h-full relative">
      {/* Discount Badge - Show if product qualifies for discount */}
      {hasDiscountPotential && (
        <div className="absolute -top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-lg">
          {discountPercentage}% OFF
        </div>
      )}

      <h3 className="text-lg font-semibold mb-2 text-black min-h-16">{product.title}</h3>

      <div className="flex justify-center mb-4 relative">
        <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center p-2 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="mb-2">
        {hasDiscount ? (
          <div>
            <span className="text-gray-500 line-through mr-2">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-lg font-bold text-black">
              ${discountedPrice?.toFixed(2)}
            </span>
          </div>
        ) : (
          <span className="text-lg font-bold text-black">
            ${product.price.toFixed(2)}
          </span>
        )}
      </div>

      <div className="mb-2">
        <label
          htmlFor={`quantity-${product.id}`}
          className="block text-sm mb-1 text-black"
        >
          {LABELS.QUANTITY}
        </label>
        <input
          id={`quantity-${product.id}`}
          type="number"
          min="1"
          defaultValue="1"
          className="w-full px-2 py-1 bg-white border border-gray-300 rounded text-black"
        />
      </div>

      <p className="text-sm text-black mb-4 flex-grow">
        <span className="font-medium">{LABELS.DESCRIPTION} </span>
        {truncateDescription(product.description)}
      </p>

      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mt-auto">
        {LABELS.ADD_TO_CART}
      </button>
    </div>
  );
};

export default ProductCard;
