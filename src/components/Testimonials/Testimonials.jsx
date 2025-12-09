import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Savannah Nguyen",
            handle: "@savannahnguyen",
            img: "https://i.pravatar.cc/150?img=9",
            review: "This book was an absolute page-turner! I couldn't put it down and was captivated from start to finish. The plot was engaging and the characters felt so real."
        },
        {
            name: "Devon Lane",
            handle: "@devonlane",
            img: "https://i.pravatar.cc/150?img=12",
            review: "Amazing collection! The delivery was fast and the books arrived in perfect condition. BookCourier has become my go-to for all my reading needs."
        },
        {
            name: "Jane Cooper",
            handle: "@janecooper",
            img: "https://i.pravatar.cc/150?img=44",
            review: "I love the variety of books available here. From classics to contemporary, they have it all. The customer service is exceptional too!"
        },
        {
            name: "Robert Fox",
            handle: "@robertfox",
            img: "https://i.pravatar.cc/150?img=13",
            review: "Best book shopping experience ever! The recommendations were spot-on and I discovered some amazing new authors. Highly recommend!"
        },
        {
            name: "Kristin Watson",
            handle: "@kristinwatson",
            img: "https://i.pravatar.cc/150?img=45",
            review: "The quality of books is outstanding and the prices are very reasonable. I've ordered multiple times and never been disappointed."
        },
        {
            name: "Cameron Williamson",
            handle: "@cameronw",
            img: "https://i.pravatar.cc/150?img=33",
            review: "Fast shipping and excellent packaging! My books arrived within 2 days and were wrapped beautifully. Will definitely order again."
        },
        {
            name: "Esther Howard",
            handle: "@estherhoward",
            img: "https://i.pravatar.cc/150?img=47",
            review: "BookCourier has transformed my reading habits. The curated collections helped me find books I never knew I needed. Absolutely love it!"
        },
        {
            name: "Ralph Edwards",
            handle: "@ralphedwards",
            img: "https://i.pravatar.cc/150?img=52",
            review: "Great platform for book lovers! The interface is user-friendly and finding books is so easy. Plus, the deals are amazing!"
        },
        {
            name: "Courtney Henry",
            handle: "@courtneyhenry",
            img: "https://i.pravatar.cc/150?img=20",
            review: "I'm impressed by the wide selection and the personalized recommendations. Every book I've purchased has been a gem!"
        },
        {
            name: "Wade Warren",
            handle: "@wadewarren",
            img: "https://i.pravatar.cc/150?img=14",
            review: "Excellent service from start to finish. The books are authentic, prices are competitive, and delivery is always on time."
        },
        {
            name: "Brooklyn Simmons",
            handle: "@brooklynsimmons",
            img: "https://i.pravatar.cc/150?img=48",
            review: "This is my favorite online bookstore! The customer support team is incredibly helpful and the book quality is top-notch."
        },
        {
            name: "Darrell Steward",
            handle: "@darrellsteward",
            img: "https://i.pravatar.cc/150?img=59",
            review: "BookCourier made my gift shopping so easy! I ordered books for my entire family and everyone loved them. Thank you!"
        },
    ];

    return (
        <section className="py-8 sm:py-10 md:py-12 w-11/12 sm:w-10/12 mx-auto">
            <h2 className="text-center font-serif text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-medium text-[#2b2b2b] mb-6 sm:mb-8 md:mb-10">
                Our Happy Customers
            </h2>
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={16}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                breakpoints={{
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                    },
                }}
                className="testimonials-swiper !pb-5 md:!pb-10"
            >
                {testimonials.map((testi, index) => (
                    <SwiperSlide key={index}>
                        <div className="testi-card bg-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl shadow-[0_5px_20px_rgba(0,0,0,0.03)] cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all duration-300 h-full min-h-[200px] sm:min-h-[220px]">
                            <div className="testi-head flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4 sm:mb-5 border-b border-[#f0f0f0] pb-3 sm:pb-4">
                                <div className="user-block flex items-center gap-2 sm:gap-3">
                                    <img src={testi.img} alt={testi.name} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0" />
                                    <div className="user-info">
                                        <h5 className="text-[0.85rem] sm:text-[0.9rem] font-semibold text-[#1a1a1a]">{testi.name}</h5>
                                        <span className="text-[0.7rem] sm:text-[0.75rem] text-[#aaa]">{testi.handle}</span>
                                    </div>
                                </div>
                                <div className="testimonial-rating flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className="fa-solid fa-star text-[#fbbf24] text-[0.65rem] sm:text-[0.7rem]"></i>
                                    ))}
                                </div>
                            </div>
                            <div className="testi-body text-[0.85rem] sm:text-[0.9rem] text-[#666] leading-relaxed">
                                "{testi.review}"
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Testimonials;
