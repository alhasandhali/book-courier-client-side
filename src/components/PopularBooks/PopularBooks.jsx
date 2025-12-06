import React from 'react';
import BookCard from '../BookCard/BookCard';
import { Link } from 'react-router';

const PopularBooks = () => {
    const books = [
        {
            title: "The Subtle Art Of Not Giving A F*ck", author: "Mark Manson", price: "$35",
            image: "https://m.media-amazon.com/images/I/71t4GuxLCuL._AC_UF1000,1000_QL80_.jpg",
            style: "bg-[#ff7d54] text-white", btnStyle: "border-white text-white"
        },
        {
            title: "The Fear Of Failure", author: "Unknown", price: "$35",
            image: "https://m.media-amazon.com/images/I/710P6-c9E5L._AC_UF1000,1000_QL80_.jpg",
            style: "bg-[#fcd34d] text-[#333]", btnStyle: "border-[#333] text-[#333]"
        },
        {
            title: "Harry Potter", author: "J.K. Rowling", price: "$35",
            image: "https://m.media-amazon.com/images/I/910+1M49AmL._AC_UF1000,1000_QL80_.jpg",
            style: "bg-[#1f6e75] text-white", btnStyle: "border-white text-white"
        },
        {
            title: "Time Wise", author: "Amantha Imber", price: "$35",
            image: "https://m.media-amazon.com/images/I/81wgcld4wxL._AC_UF1000,1000_QL80_.jpg",
            style: "bg-white border border-[#eee]", btnStyle: ""
        },
    ];

    return (
        <section className="w-11/12 sm:w-10/12 mx-auto py-6 sm:py-8 md:py-10">
            <div className="section-head">
                <h2>Popular this month</h2>
                <Link to="/books" className="see-all">
                    See all <i className="fa-solid fa-arrow-right-long"></i>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                {books.map((book, index) => (
                    <BookCard key={index} book={book} variant="popular" />
                ))}
            </div>
        </section>
    );
};

export default PopularBooks;
