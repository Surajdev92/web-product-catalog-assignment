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
    const productPrices = products.map((product) => product.price);
    return {
      minPrice: Math.min(...productPrices),
      maxPrice: Math.max(...productPrices),
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

  const handleMouseDown = (
    mouseEvent: React.MouseEvent,
    handleType: "min" | "max"
  ) => {
    mouseEvent.preventDefault();
    setIsDragging(handleType);
    const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
      if (!sliderRef.current) return;
      const sliderRect = sliderRef.current.getBoundingClientRect();
      const mouseX = mouseMoveEvent.clientX - sliderRect.left;
      const percentage = Math.max(
        0,
        Math.min(100, (mouseX / sliderRect.width) * 100)
      );
      const calculatedValue = minPrice + (percentage / 100) * priceRangeDiff;

      if (handleType === "min") {
        const newMinValue = Math.max(
          minPrice,
          Math.min(calculatedValue, maxSelected)
        );
        onPriceRangeChange([newMinValue, maxSelected]);
      } else {
        const newMaxValue = Math.max(
          minSelected,
          Math.min(calculatedValue, maxPrice)
        );
        onPriceRangeChange([minSelected, newMaxValue]);
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

  const handleTouchStart = (
    touchEvent: React.TouchEvent,
    handleType: "min" | "max"
  ) => {
    touchEvent.preventDefault();
    setIsDragging(handleType);
    const handleTouchMove = (touchMoveEvent: TouchEvent) => {
      if (!sliderRef.current || !touchMoveEvent.touches[0]) return;
      const sliderRect = sliderRef.current.getBoundingClientRect();
      const touchX = touchMoveEvent.touches[0].clientX - sliderRect.left;
      const percentage = Math.max(
        0,
        Math.min(100, (touchX / sliderRect.width) * 100)
      );
      const calculatedValue = minPrice + (percentage / 100) * priceRangeDiff;

      if (handleType === "min") {
        const newMinValue = Math.max(
          minPrice,
          Math.min(calculatedValue, maxSelected)
        );
        onPriceRangeChange([newMinValue, maxSelected]);
      } else {
        const newMaxValue = Math.max(
          minSelected,
          Math.min(calculatedValue, maxPrice)
        );
        onPriceRangeChange([minSelected, newMaxValue]);
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
          onMouseDown={(mouseEvent) => handleMouseDown(mouseEvent, "min")}
          onTouchStart={(touchEvent) => handleTouchStart(touchEvent, "min")}
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
          onMouseDown={(mouseEvent) => handleMouseDown(mouseEvent, "max")}
          onTouchStart={(touchEvent) => handleTouchStart(touchEvent, "max")}
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
