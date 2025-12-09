import React from 'react';
import BookCard from '../BookCard/BookCard';
import { Link } from 'react-router';

import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

const BestSellers = () => {
    const axiosPublic = useAxios();

    const { data: books = [] } = useQuery({
        queryKey: ['bestSellers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/books');
            return res.data;
        }
    });

    const displayedBooks = books.slice(0, 4);

    return (
        <section className="w-11/12 sm:w-10/12 mx-auto py-6 sm:py-8 md:py-10">
            <div className="section-head">
                <h2>Best seller of all time</h2>
                <Link to="/books" className="see-all">
                    See all <i className="fa-solid fa-arrow-right-long"></i>
                </Link>
            </div>

            <div className="hidden md:grid md:grid-cols-4 gap-5 sm:gap-6">
                {displayedBooks.map((book, index) => (
                    <BookCard key={book._id || index} book={book} variant="bestseller" />
                ))}
            </div>

            <div className="md:hidden">
                <Swiper
                    slidesPerView={1.2}
                    spaceBetween={20}
                    freeMode={true}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        480: {
                            slidesPerView: 2.1,
                            spaceBetween: 20,
                        }
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true
                    }}
                    modules={[Pagination, FreeMode, Autoplay]}
                    className="!pb-12"
                >
                    {displayedBooks.map((book, index) => (
                        <SwiperSlide key={book._id || index}>
                            <BookCard book={book} variant="bestseller" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default BestSellers;
