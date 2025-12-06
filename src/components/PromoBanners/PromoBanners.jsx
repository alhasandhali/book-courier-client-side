import React from 'react';

const PromoBanners = () => {
    const promos = [
        { title: "Flat 20% OFF", desc: "for comics books!", icon: "https://cdn-icons-png.flaticon.com/512/2232/2232688.png" },
        { title: "Flat 25% OFF", desc: "for science fiction books!", icon: "https://cdn-icons-png.flaticon.com/512/2038/2038165.png" },
        { title: "Flat 15% OFF", desc: "for novels!", icon: "https://cdn-icons-png.flaticon.com/512/3389/3389081.png" },
    ];

    return (
        <div className='w-11/12 sm:w-10/12 mx-auto my-12 sm:my-16 md:my-20'>
            <div className="promo-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {promos.map((promo, index) => (
                    <div key={index} className="promo-banner bg-[#f4f1ea] border border-dashed border-[#d1cfc7] rounded-lg p-5 sm:p-6 flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                        <div className="promo-content">
                            <h3 className="font-serif text-[1rem] sm:text-[1.1rem] text-[#d84315] font-bold mb-1">{promo.title}</h3>
                            <p className="text-[0.8rem] sm:text-[0.85rem] text-[#555]">{promo.desc}</p>
                            <a href="#" className="text-[0.7rem] sm:text-[0.75rem] underline text-[#888] mt-1 block">View details <i className="fa-solid fa-arrow-right"></i></a>
                        </div>
                        <img src={promo.icon} alt="Icon" className="w-[40px] sm:w-[50px] opacity-90" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PromoBanners;
