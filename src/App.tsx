import React, { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";
import Navbar from "./components/Navbar";
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';
import { AnimatePresence, motion } from "framer-motion";
import * as FaIcons from "react-icons/fa";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [dislikedProducts, setDislikedProducts] = useState<number[]>([]);
  const [cartProducts, setCartProducts] = useState<number[]>([]);
  const [safeAreaTop, setSafeAreaTop] = useState(0);
  const [swipeFeedback, setSwipeFeedback] = useState<null | 'like' | 'dislike' | 'cart'>(null);
  const HeartIcon = FaIcons.FaHeart as React.ElementType;
  const DislikeIcon = FaIcons.FaThumbsDown as React.ElementType;
  const CartIcon = FaIcons.FaShoppingCart as React.ElementType;


  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({ color: '#ffffff' });
      
      const initializeSafeArea = async () => {
        const info = await StatusBar.getInfo();
        const notchPadding = info.overlays ? 48 : 24;
        setSafeAreaTop(notchPadding);
      };
      initializeSafeArea();
    }
  }, []);

  const handleSwipeLeft = (id: number) => {
    console.log("Disliked Product ID:", id);
    setDislikedProducts([...dislikedProducts, id]);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    showFeedback('dislike');
  };

  const handleSwipeRight = (id: number) => {
    console.log("Liked Product ID:", id);
    setLikedProducts([...likedProducts, id]);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    showFeedback('like');
  };

  const handleSwipeUp = (id: number) => {
    console.log("Added to cart Product ID:", id);
    setCartProducts([...cartProducts, id]);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    showFeedback('cart');
  };

  const getVisibleProducts = () => {
    const visibleProducts = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % products.length;
      visibleProducts.push(products[index]);
    }
    return visibleProducts;
  };

  const visibleProducts = getVisibleProducts();

  const showFeedback = (type: 'like' | 'dislike' | 'cart') => {
    setSwipeFeedback(type);
    setTimeout(() => setSwipeFeedback(null), 700);
  };


  return (
    <div className="h-screen overflow-hidden bg-gray-100">
      <div 
        style={{ 
          paddingTop: Capacitor.isNativePlatform() ? `${safeAreaTop}px` : '0',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: '#ffffff'
        }}
      >
        <Navbar />
      </div>
      <div 
        className="h-[calc(100vh)] px-4 sm:px-6 lg:px-8"
        style={{
          paddingTop: Capacitor.isNativePlatform() ? `${safeAreaTop + 56}px` : '0'
        }}
      >
        <div className="h-full max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center h-full pt-4">
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
                {swipeFeedback && (
                <motion.div
                  key={swipeFeedback}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1.2 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  style={{
                    position: 'absolute',
                    top: '40%',
                    left: '40%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 50,
                    pointerEvents: 'none',
                  }}
                >
                  <div className="flex items-center justify-center">

                 {swipeFeedback === 'like' && (
                    <HeartIcon className="text-red-500 text-[72px] drop-shadow-lg animate-bounce" />
                  )}
                  {swipeFeedback === 'dislike' && (
                    <DislikeIcon className="text-gray-500 text-[72px] drop-shadow-lg animate-bounce" />
                  )}
                  {swipeFeedback === 'cart' && (
                    <CartIcon className="text-green-500 text-[72px] drop-shadow-lg animate-bounce" />
                  )}
                  </div>
                </motion.div>
              )}
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
