import React from 'react';
import BookCard from '../BookCard/BookCard';
import { Link } from 'react-router';

const RecentlyAdded = () => {
    const books = [
        { title: "House of stars", author: "Lili Loveless", price: "$35", image: "https://m.media-amazon.com/images/I/91tA-j-A5eL._AC_UF1000,1000_QL80_.jpg" },
        { title: "Charles dickens", author: "History belly", price: "$35", image: "https://m.media-amazon.com/images/I/81EvI+G5QpL._AC_UF1000,1000_QL80_.jpg" },
        { title: "Curveball", author: "Barry Zito", price: "$15", image: "https://m.media-amazon.com/images/I/91+1H-5d4AL._AC_UF1000,1000_QL80_.jpg" },
        { title: "Prince & a Spy", author: "Rory Clements", price: "$25", image: "https://m.media-amazon.com/images/I/71s72r-kRjL._AC_UF1000,1000_QL80_.jpg" },
    ];

    return (
        <section className="w-11/12 sm:w-10/12 mx-auto py-6 sm:py-8 md:py-10">
            <div className="section-head">
                <h2>Recently added</h2>
                <Link to="/books" className="see-all">
                    See all <i className="fa-solid fa-arrow-right-long"></i>
                </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
                {books.map((book, index) => (
                    <BookCard key={index} book={book} variant="default" />
                ))}
            </div>
        </section>
    );
};

export default RecentlyAdded;
