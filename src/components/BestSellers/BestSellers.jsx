import React from 'react';
import BookCard from '../BookCard/BookCard';
import { Link } from 'react-router';

const BestSellers = () => {
    const books = [
        {
            title: "How To Talk", author: "Leil Lowndes", price: "$35",
            image: "https://m.media-amazon.com/images/I/711cvC8nK3L._AC_UF1000,1000_QL80_.jpg",
            bgClass: "bg-card-blue"
        },
        {
            title: "The 10X Rule", author: "Grant Cardone", price: "$35",
            image: "https://m.media-amazon.com/images/I/71d17-91kUL._AC_UF1000,1000_QL80_.jpg",
            bgClass: "bg-card-yellow"
        },
        {
            title: "Rich Dad...", author: "Robert Kiyosaki", price: "$35",
            image: "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg",
            bgClass: "bg-card-purple"
        },
        {
            title: "Steal Like An Artist", author: "Austin Kleon", price: "$35",
            image: "https://m.media-amazon.com/images/I/61mIq2iJUXL._AC_UF1000,1000_QL80_.jpg",
            bgClass: "bg-card-black text-white"
        },
    ];

    return (
        <section className="w-11/12 sm:w-10/12 mx-auto py-6 sm:py-8 md:py-10">
            <div className="section-head">
                <h2>Best seller of all time</h2>
                <Link to="/books" className="see-all">
                    See all <i className="fa-solid fa-arrow-right-long"></i>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                {books.map((book, index) => (
                    <BookCard key={index} book={book} variant="bestseller" />
                ))}
            </div>
        </section>
    );
};

export default BestSellers;
