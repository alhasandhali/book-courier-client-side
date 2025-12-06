import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import { Link } from 'react-router';

const Hero = () => {
    const books = [
        { img: "https://m.media-amazon.com/images/I/81wgcld4wxL._AC_UF1000,1000_QL80_.jpg", title: "Atomic Habits" },
        { img: "https://m.media-amazon.com/images/I/81l3rZK4lnL._AC_UF1000,1000_QL80_.jpg", title: "Ikigai" },
        { img: "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg", title: "Naval" },
        { img: "https://m.media-amazon.com/images/I/711cvC8nK3L._AC_UF1000,1000_QL80_.jpg", title: "How to Talk" },
        { img: "https://m.media-amazon.com/images/I/71t4GuxLCuL._AC_UF1000,1000_QL80_.jpg", title: "The Subtle Art" },
        { img: "https://m.media-amazon.com/images/I/715zWp1i-WL._AC_UF1000,1000_QL80_.jpg", title: "Psychology of Money" },
        { img: "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg", title: "Rich Dad Poor Dad" },
        { img: "https://m.media-amazon.com/images/I/71d17-91kUL._AC_UF1000,1000_QL80_.jpg", title: "The 10X Rule" }
    ];

    return (
        <section className="hero-section">
            <div className='w-11/12 sm:w-10/12 mx-auto grid grid-cols-1 lg:grid-cols-2 items-center py-8 sm:py-12 md:py-16 gap-8 md:gap-12 lg:gap-20'>
                {/* Left Part */}
                <div className="hero-text w-full text-center lg:text-left lg:pl-8 xl:pl-20">
                    <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] leading-[1.1] font-medium text-[#2b2b2b] mb-4 sm:mb-6">
                        Find Your <br />Next Book
                    </h1>
                    <p className="text-text-muted text-[0.9rem] sm:text-[1rem] leading-[1.6] max-w-[500px] mb-6 sm:mb-9 mx-auto lg:mx-0">
                        Discover a world where every page brings a new adventure. At Paper
                        Haven, we curate a diverse collection of books.
                    </p>
                    <Link to="/books" className="btn-primary rounded-full inline-flex">
                        Explore Now <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                </div>

                {/* Right Part */}
                <div className="hero-visuals relative w-full h-[350px] sm:h-[400px] md:h-[450px] flex items-center justify-center">
                    <Swiper
                        effect="cards"
                        grabCursor={true}
                        modules={[EffectCards, Pagination, Autoplay]}
                        className="w-[220px] sm:w-[260px] md:w-[300px] h-[320px] sm:h-[380px] md:h-[420px]"
                        loop={true}
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                    >
                        {books.map((book, index) => (
                            <SwiperSlide
                                key={index}
                                className="bg-[#f2efe9] rounded-2xl shadow-xl overflow-hidden"
                            >
                                <img
                                    src={book.img}
                                    alt={book.title}
                                    className="w-full h-full object-cover"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Hero;
