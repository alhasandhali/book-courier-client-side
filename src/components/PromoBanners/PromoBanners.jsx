import React from "react";

const PromoBanners = () => {
  const promos = [
    {
      title: "Flat 20% OFF",
      desc: "for comics books!",
      icon: "https://cdn-icons-png.flaticon.com/512/2232/2232688.png",
    },
    {
      title: "Flat 25% OFF",
      desc: "for science fiction books!",
      icon: "https://cdn-icons-png.flaticon.com/512/2038/2038165.png",
    },
    {
      title: "Flat 15% OFF",
      desc: "for novels!",
      icon: "https://cdn-icons-png.flaticon.com/512/3389/3389081.png",
    },
  ];

  return (
    <div className="w-11/12 sm:w-10/12 mx-auto py-8 md:py-10">
      <div className="promo-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {promos.map((promo, index) => (
          <div
            key={index}
            className="srv-card bg-bg-card border border-card-border rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
          >
            <div className="promo-content">
              <h3 className="font-serif text-[1rem] sm:text-[1.1rem] text-accent-gold font-bold mb-1">
                {promo.title}
              </h3>
              <p className="text-[0.8rem] sm:text-[0.85rem] text-text-muted">
                {promo.desc}
              </p>
              <a
                href="#"
                className="text-[0.7rem] sm:text-[0.75rem] underline text-text-muted/60 mt-1 block"
              >
                View details <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
            <img
              src={promo.icon}
              alt="Icon"
              className="w-10 sm:w-[50px] opacity-90"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoBanners;
