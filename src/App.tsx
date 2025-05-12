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
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    // Initialize Status Bar
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({ color: '#ffffff' });
      
      // Get status bar height
      const getStatusBarHeight = async () => {
        const info = await StatusBar.getInfo();
        // Default to 24px if height is not available
        setStatusBarHeight(info.overlays ? 0 : 24);
      };
      getStatusBarHeight();
    }
  }, []);

  const handleSwipeLeft = (id: number) => {
    console.log("Disliked Product ID:", id);
    setDislikedProducts([...dislikedProducts, id]);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handleSwipeRight = (id: number) => {
    console.log("Liked Product ID:", id);
    setLikedProducts([...likedProducts, id]);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handleSwipeUp = (id: number) => {
    console.log("Added to cart Product ID:", id);
    setCartProducts([...cartProducts, id]);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  // Get the next 3 products for the stack, with wrapping
  const getVisibleProducts = () => {
    const visibleProducts = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % products.length;
      visibleProducts.push(products[index]);
    }
    return visibleProducts;
  };

  const visibleProducts = getVisibleProducts();

  return (
    <div className="h-screen overflow-hidden bg-gray-100">
      <div style={{ paddingTop: Capacitor.isNativePlatform() ? `${statusBarHeight}px` : '0' }}>
        <Navbar />
      </div>
      <div className="h-[calc(100vh)] px-4 sm:px-6 lg:px-8">
        <div className="h-full max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-full max-w-sm h-[70vh] relative">
              <AnimatePresence>
                {visibleProducts.map((product, index) => (
                  <ProductCard
                    key={`${product.id}-${currentIndex + index}`}
                    product={product}
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    onSwipeUp={handleSwipeUp}
                    index={index}
                    totalCards={visibleProducts.length}
                  />
                ))}
              </AnimatePresence>
            </div>
            <div className="mt-4 text-center">
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
