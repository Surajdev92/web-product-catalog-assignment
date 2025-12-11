import { useMemo, useState, useRef } from "react";

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
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const priceRangeDiff = maxPrice - minPrice;
  const minPercentage =
    priceRangeDiff > 0 ? ((minSelected - minPrice) / priceRangeDiff) * 100 : 0;
  const maxPercentage =
    priceRangeDiff > 0
      ? ((maxSelected - minPrice) / priceRangeDiff) * 100
      : 100;

  const handleMouseDown = (e: React.MouseEvent, type: "min" | "max") => {
    e.preventDefault();
    setIsDragging(type);
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = moveEvent.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const value = minPrice + (percentage / 100) * priceRangeDiff;

      if (type === "min") {
        const newMin = Math.max(minPrice, Math.min(value, maxSelected));
        onPriceRangeChange([newMin, maxSelected]);
      } else {
        const newMax = Math.max(minSelected, Math.min(value, maxPrice));
        onPriceRangeChange([minSelected, newMax]);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(null);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent, type: "min" | "max") => {
    e.preventDefault();
    setIsDragging(type);
    const handleTouchMove = (moveEvent: TouchEvent) => {
      if (!sliderRef.current || !moveEvent.touches[0]) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = moveEvent.touches[0].clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const value = minPrice + (percentage / 100) * priceRangeDiff;

      if (type === "min") {
        const newMin = Math.max(minPrice, Math.min(value, maxSelected));
        onPriceRangeChange([newMin, maxSelected]);
      } else {
        const newMax = Math.max(minSelected, Math.min(value, maxPrice));
        onPriceRangeChange([minSelected, newMax]);
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(null);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-2 text-black">
        {LABELS.PRICE_RANGE} ${minSelected.toFixed(2)} - $
        {maxSelected.toFixed(2)}
      </label>
      <div ref={sliderRef} className="relative h-8 mb-2">
        {/* Track background */}
        <div className="absolute w-full h-1 bg-gray-400 rounded-lg top-1/2 -translate-y-1/2" />

        {/* Active range indicator */}
        <div
          className="absolute h-1 bg-blue-500 rounded-lg top-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `${minPercentage}%`,
            width: `${maxPercentage - minPercentage}%`,
            zIndex: 0,
          }}
        />

        {/* Min handle - only the circle */}
        <div
          className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
          style={{
            left: `${minPercentage}%`,
            top: "50%",
            zIndex: isDragging === "min" ? 20 : isDragging === "max" ? 10 : 15,
          }}
          onMouseDown={(e) => handleMouseDown(e, "min")}
          onTouchStart={(e) => handleTouchStart(e, "min")}
        >
          <div className="w-6 h-6 rounded-full bg-blue-500 border-[3px] border-white shadow-lg flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
        </div>

        {/* Max handle - only the circle */}
        <div
          className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
          style={{
            left: `${maxPercentage}%`,
            top: "50%",
            zIndex: isDragging === "max" ? 20 : isDragging === "min" ? 10 : 16,
          }}
          onMouseDown={(e) => handleMouseDown(e, "max")}
          onTouchStart={(e) => handleTouchStart(e, "max")}
        >
          <div className="w-6 h-6 rounded-full bg-blue-500 border-[3px] border-white shadow-lg flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-600">
        <span>${minPrice.toFixed(2)}</span>
        <span>${maxPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
