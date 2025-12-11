import { useMemo } from "react";
import type { IProduct } from "../../types/product";
import { LABELS } from "../../constants";

interface IPriceRangeSliderProps {
  products: IProduct[];
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

const PriceRangeSlider = ({
  products,
  priceRange,
  onPriceRangeChange,
}: IPriceRangeSliderProps) => {
  const { minPrice, maxPrice } = useMemo(() => {
    if (products.length === 0) {
      return { minPrice: 0, maxPrice: 1000 };
    }
    const prices = products.map((p) => p.price);
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  }, [products]);

  const [minSelected, maxSelected] = priceRange;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseFloat(e.target.value);
    if (newMin <= maxSelected) {
      onPriceRangeChange([newMin, maxSelected]);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseFloat(e.target.value);
    if (newMax >= minSelected) {
      onPriceRangeChange([minSelected, newMax]);
    }
  };

  const priceRangeDiff = maxPrice - minPrice;
  const minPercentage =
    priceRangeDiff > 0 ? ((minSelected - minPrice) / priceRangeDiff) * 100 : 0;
  const maxPercentage =
    priceRangeDiff > 0
      ? ((maxSelected - minPrice) / priceRangeDiff) * 100
      : 100;

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-2 text-black">
        {LABELS.PRICE_RANGE} ${minSelected.toFixed(2)} - $
        {maxSelected.toFixed(2)}
      </label>
      <div className="relative h-6 mb-2">
        <div className="absolute w-full h-1 bg-gray-400 rounded-lg top-1/2 -translate-y-1/2" />
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          step="0.01"
          value={minSelected}
          onChange={handleMinChange}
          className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer slider mt-2"
          style={{
            zIndex:
              minSelected > maxSelected - (maxPrice - minPrice) * 0.1 ? 3 : 1,
          }}
        />
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          step="0.01"
          value={maxSelected}
          onChange={handleMaxChange}
          className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer slider mt-2"
          style={{ zIndex: 2 }}
        />
        <div
          className="absolute h-1 bg-blue-500 rounded-lg top-1/2 -translate-y-1/2"
          style={{
            left: `${minPercentage}%`,
            width: `${maxPercentage - minPercentage}%`,
            zIndex: 0,
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-600">
        <span>${minPrice.toFixed(2)}</span>
        <span>${maxPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
