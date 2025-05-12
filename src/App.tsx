import React, { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";
import Navbar from "./components/Navbar";
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';
import { AnimatePresence } from "framer-motion";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [dislikedProducts, setDislikedProducts] = useState<number[]>([]);
  const [cartProducts, setCartProducts] = useState<number[]>([]);

  useEffect(() => {
    // Initialize Status Bar
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({ color: '#ffffff' });
    }
  }, []);

  const handleSwipeLeft = (id: number) => {
    console.log("Disliked Product ID:", id);
    setDislikedProducts([...dislikedProducts, id]);
    setCurrentIndex(currentIndex + 1);
  };

  const handleSwipeRight = (id: number) => {
    console.log("Liked Product ID:", id);
    setLikedProducts([...likedProducts, id]);
    setCurrentIndex(currentIndex + 1);
  };

  const handleSwipeUp = (id: number) => {
    console.log("Added to cart Product ID:", id);
    setCartProducts([...cartProducts, id]);
    setCurrentIndex(currentIndex + 1);
  };

  // Get the next 3 products for the stack
  const visibleProducts = products.slice(currentIndex, currentIndex + 3);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
            <div className="w-full max-w-sm h-[70vh] relative">
              <AnimatePresence>
                {visibleProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    onSwipeUp={handleSwipeUp}
                    index={index}
                    totalCards={visibleProducts.length}
                  />
                ))}
              </AnimatePresence>
              {currentIndex >= products.length && (
                <div className="absolute inset-0 flex items-center justify-center bg-white rounded-xl shadow-lg">
                  <p className="text-xl text-gray-600">No more products to show!</p>
                </div>
              )}
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                Swipe right to like, left to dislike, or up to add to cart
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
