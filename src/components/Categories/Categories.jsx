import React from "react";

const Categories = () => {
  const categories = [
    { name: "History", icon: "fa-hourglass-half" },
    { name: "Children's Corner", icon: "fa-shapes" },
    { name: "Science Fiction", icon: "fa-robot" },
    { name: "Self Improvement", icon: "fa-wand-magic-sparkles" },
    { name: "Comics", icon: "fa-mask" },
    { name: "Mystery & Thriller", icon: "fa-magnifying-glass" },
    { name: "Romance", icon: "fa-heart" },
    { name: "Fantasy", icon: "fa-dragon" },
    { name: "Biography", icon: "fa-user" },
    { name: "Business & Finance", icon: "fa-briefcase" },
    { name: "Health & Wellness", icon: "fa-heart-pulse" },
    { name: "Technology", icon: "fa-microchip" },
    { name: "Cooking", icon: "fa-utensils" },
    { name: "Travel", icon: "fa-plane" },
    { name: "Art & Design", icon: "fa-palette" },
    { name: "Poetry", icon: "fa-feather" },
    { name: "Philosophy", icon: "fa-brain" },
    { name: "Religion & Spirituality", icon: "fa-om" },
  ];

  return (
    <div className="w-10/12 m-auto overflow-hidden border-y border-[#eaeaea] mt-4 mb-8">
      <div className="category-slider py-4 sm:py-6 md:py-8">
        <div className="category-track flex gap-6 sm:gap-8 md:gap-12 animate-scroll">
          {categories.map((cat, index) => (
            <div
              key={`cat-1-${index}`}
              className="cat-item flex items-center gap-2 sm:gap-3 text-[0.8rem] sm:text-[0.9rem] text-text-muted cursor-pointer hover:text-accent-gold transition-colors whitespace-nowrap shrink-0"
            >
              <span className="cat-icon-box text-[1rem] sm:text-[1.1rem] text-[#333]">
                <i className={`fa-solid ${cat.icon}`}></i>
              </span>
              {cat.name}
            </div>
          ))}
          {categories.map((cat, index) => (
            <div
              key={`cat-2-${index}`}
              className="cat-item flex items-center gap-2 sm:gap-3 text-[0.8rem] sm:text-[0.9rem] text-text-muted cursor-pointer hover:text-accent-gold transition-colors whitespace-nowrap shrink-0"
            >
              <span className="cat-icon-box text-[1rem] sm:text-[1.1rem] text-[#333]">
                <i className={`fa-solid ${cat.icon}`}></i>
              </span>
              {cat.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
