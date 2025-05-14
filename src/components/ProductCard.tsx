import React from "react";
import { Product } from "../types/product";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  onSwipeLeft: (id: number) => void;
  onSwipeRight: (id: number) => void;
  onSwipeUp: (id: number) => void;
  index: number;
  totalCards: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  index,
  totalCards,
}) => {
  const handleDragEnd = (event: any, info: any) => {
    const { offset, velocity } = info;
    const swipe = Math.abs(offset.x) * velocity.x;
    const swipeUp = Math.abs(offset.y) * velocity.y;

    const minDragDistance = 50;

    const angle = Math.atan2(offset.y, offset.x) * (180 / Math.PI);
    const isHorizontalSwipe = Math.abs(angle) < 30 || Math.abs(angle) > 150;
    const isVerticalSwipe = Math.abs(angle) > 60 && Math.abs(angle) < 120;

    if (
      Math.abs(offset.x) < minDragDistance &&
      Math.abs(offset.y) < minDragDistance
    ) {
      return;
    }

    if (
      isVerticalSwipe &&
      swipeUp < -0.8 &&
      Math.abs(offset.y) > minDragDistance
    ) {
      onSwipeUp(product.id);
    } else if (isHorizontalSwipe) {
      if (swipe > 0.8 && Math.abs(offset.x) > minDragDistance) {
        onSwipeRight(product.id);
      } else if (swipe < -0.8 && Math.abs(offset.x) > minDragDistance) {
        onSwipeLeft(product.id);
      }
    }
  };

  const stackOffset = index * 2;

  return (
    <motion.div
      initial={{ scale: 0.95, y: 20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.95, y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 bg-white rounded-xl shadow-lg overflow-hidden cursor-grab active:cursor-grabbing flex flex-col"
      style={{
        boxShadow: `0 ${stackOffset}px ${stackOffset * 2}px rgba(0,0,0,0.1)`,
        zIndex: totalCards - index,
      }}
      drag
      dragDirectionLock
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05 }}
    >
      <div className="relative h-[70%]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.discountPercentage > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {product.discountPercentage}% OFF
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col overflow-hidden">
        <h2 className="text-xl font-semibold line-clamp-1">{product.brand}</h2>
        <p className="text-gray-600 mt-1 line-clamp-3 flex-1">{product.name}</p>
        <div className="mt-2 flex items-center gap-2">
          <p className="text-lg font-bold text-green-600">
            ₹{product.price.toFixed(2)}
          </p>
          {product.discountPercentage > 0 && (
            <p className="text-sm text-gray-500 line-through">
              ₹{product.originalPrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
