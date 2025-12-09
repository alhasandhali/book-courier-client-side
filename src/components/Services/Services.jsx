import React from "react";

const Services = () => {
  const services = [
    {
      title: "Free shipping",
      desc: "Anywhere in Bangladesh",
      icon: "fa-truck-fast",
    },
    {
      title: "Cash on delivery",
      desc: "100% cash on delivery",
      icon: "fa-wallet",
    },
    {
      title: "24/7 online supports",
      desc: "Call & get solution anytime",
      icon: "fa-headset",
    },
    {
      title: "Money back guarantee",
      desc: "within 14 days",
      icon: "fa-rotate-left",
    },
  ];

  return (
    <div className="w-11/12 sm:w-10/12 mx-auto pt-10 md:pt-15 pb-10">
      <div className="services-strip grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {services.map((srv, index) => (
          <div
            key={index}
            className="srv-card bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
          >
            <div className="icon-wrapper w-16 h-16 bg-accent-gold/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent-gold/20 transition-colors">
              <i
                className={`fa-solid ${srv.icon} text-[1.5rem] text-accent-gold`}
              ></i>
            </div>
            <div className="srv-text">
              <h5 className="text-[1rem] font-semibold mb-2 text-text-main group-hover:text-accent-gold transition-colors">
                {srv.title}
              </h5>
              <p className="text-[0.85rem] text-text-muted leading-relaxed">
                {srv.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
