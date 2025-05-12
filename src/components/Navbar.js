import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors duration-300">
              Shoppin'
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
