import React from 'react';
import BookCard from '../BookCard/BookCard';
import { Link } from 'react-router';

const RecommendedBooks = () => {
    const books = [
        {
            title: "Emotional intelligence",
            author: "Daniel Goleman",
            price: "$12",
            rating: "4.9",
            image: "https://m.media-amazon.com/images/I/611X8Gi7hpL._AC_UF1000,1000_QL80_.jpg"
        },
        {
            title: "How to talk to Anyone",
            author: "Leil Lowndes",
            price: "$32",
            rating: "4.9",
            image: "https://m.media-amazon.com/images/I/711cvC8nK3L._AC_UF1000,1000_QL80_.jpg"
        },
        {
            title: "Who Moved My Cheese",
            author: "Spencer Johnson",
            price: "$32",
            rating: "4.9",
            image: "https://m.media-amazon.com/images/I/71N4DYbb8LL._AC_UF1000,1000_QL80_.jpg"
        },
        {
            title: "The Psychology of Money",
            author: "Morgan Housel",
            price: "$12",
            rating: "4.9",
            image: "https://m.media-amazon.com/images/I/715zWp1i-WL._AC_UF1000,1000_QL80_.jpg"
        }
    ];

    return (
        <section className="w-11/12 sm:w-10/12 mx-auto py-6 sm:py-8 md:py-10">
            <div className="section-head">
                <h2>Recommended For You</h2>
                <Link to="/books" className="see-all">
                    See all <i className="fa-solid fa-arrow-right-long"></i>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                {books.map((book, index) => (
                    <BookCard key={index} book={book} variant="recommended" />
                ))}
            </div>
        </section>
    );
};

export default RecommendedBooks;
