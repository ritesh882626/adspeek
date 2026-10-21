import React from 'react';

export function BrandLogoStrip() {
  const brands = [
    { name: 'SIMONS', tag: 'Fashion & Apparel', style: 'font-black tracking-tight' },
    { name: 'PEDRO', tag: 'Shoes & Footwear', style: 'font-extrabold tracking-widest' },
    { name: 'OTT TAHILIANI', tag: 'Designer Couture', style: 'font-black tracking-tight' },
    { name: 'VIRANI', tag: 'Fine Jewelry', style: 'font-black tracking-widest' },
    { name: 'BLUBOHO', tag: 'Conscious Jewelry', style: 'font-extrabold tracking-wider' },
    { name: 'ARTICTURE', tag: 'Home Decor & Living', style: 'font-black tracking-tight' },
    { name: 'AAPKA BAZAR', tag: 'Grocery & Essentials', style: 'font-black tracking-tight' },
    { name: 'TATVA HILLS', tag: 'Food & Superfoods', style: 'font-black tracking-wide' },
    { name: 'WELLDUNN', tag: 'Artisan Jewelry', style: 'font-extrabold tracking-wider' },
    { name: 'NOURISH', tag: 'Organic Foods', style: 'font-black tracking-tight' },
    { name: 'ACANA', tag: 'Pet Nutrition', style: 'font-black tracking-wider' },
    { name: 'MARGERITA', tag: 'Apparel & Resortwear', style: 'font-extrabold tracking-tight' },
    { name: 'ADAORE', tag: 'Waterproof Jewelry', style: 'font-black tracking-widest' },
    { name: 'HEAPWELL', tag: 'Matcha & Superfoods', style: 'font-black tracking-tight' },
    { name: 'TRUE HUNT', tag: 'Natural Pet Food', style: 'font-black tracking-wide' },
  ];

  return (
    <div className="w-full bg-[#FAF9F5] border-b border-gray-200/70 py-8 sm:py-12 overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        <p className="text-center text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gray-500 mb-6 sm:mb-8">
          ENGINEERED FOR SCALING ECOMMERCE BRANDS GLOBALLY
        </p>

        {/* Responsive grid displaying brand names in prominent heavy fonts */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-5 items-center justify-center">
          {brands.map((brand, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl border border-gray-200/60 bg-white/60 hover:bg-white hover:border-[#0C5A48]/30 hover:shadow-sm transition-all text-center group cursor-default"
            >
              <span
                className={`text-base sm:text-lg md:text-xl text-gray-950 group-hover:text-[#0C5A48] transition-colors ${brand.style}`}
              >
                {brand.name}
              </span>
              <span className="text-[9px] sm:text-[10px] text-gray-500 font-mono mt-1 truncate max-w-full uppercase tracking-wider">
                {brand.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

