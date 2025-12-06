import React from 'react';
import { Link } from 'react-router';

const BookCard = ({ book, variant = 'default' }) => {
    // Default variant - simple card with price
    if (variant === 'default') {
        return (
            <Link to={`/books/${book.id || book.title}`} className="book-card group cursor-pointer block">
                <div className="card-cover-wrap bg-[#f2f2f2] rounded-md h-[220px] sm:h-[250px] md:h-[280px] flex items-center justify-center mb-3 sm:mb-4 relative overflow-hidden">
                    <img
                        src={book.image}
                        alt={book.title}
                        className="h-[80%] w-auto shadow-md transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="book-info">
                    <h3 className="font-serif text-[0.95rem] sm:text-[1rem] md:text-[1.1rem] font-bold mb-1 text-[#2c2c2c] group-hover:text-accent-gold transition-colors line-clamp-2">
                        {book.title}
                    </h3>
                    <p className="text-[0.8rem] sm:text-[0.85rem] text-text-muted mb-2">{book.author}</p>
                </div>
                <div className="price font-serif font-bold text-[1rem] sm:text-[1.1rem]">{book.price}</div>
            </Link>
        );
    }

    // Recommended variant - with rating and add to cart button
    if (variant === 'recommended') {
        return (
            <div className="book-card group cursor-pointer">
                <Link to={`/books/${book.id || book.title}`}>
                    <div className="card-cover-wrap bg-[#f4f4f4] rounded-md h-[220px] sm:h-[250px] md:h-[280px] flex items-center justify-center mb-3 sm:mb-4 relative overflow-hidden">
                        <img
                            src={book.image}
                            alt={book.title}
                            className="h-[80%] w-auto shadow-md transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <div className="book-info">
                        <h3 className="font-serif text-[0.95rem] sm:text-[1rem] md:text-[1.1rem] font-bold mb-1 text-[#2c2c2c] group-hover:text-accent-gold transition-colors line-clamp-2">
                            {book.title}
                        </h3>
                        <p className="text-[0.8rem] sm:text-[0.85rem] text-text-muted mb-2">By {book.author}</p>
                        {book.rating && (
                            <div className="rating text-[0.75rem] sm:text-[0.8rem] font-semibold flex items-center gap-1 mb-3 sm:mb-4">
                                <i className="fa-solid fa-star text-[#2c2c2c] text-[0.65rem] sm:text-[0.7rem]"></i> {book.rating}
                            </div>
                        )}
                    </div>
                </Link>
                <div className="card-actions flex justify-between items-center gap-2">
                    <span className="price font-serif font-bold text-[1rem] sm:text-[1.1rem]">{book.price}</span>
                    <button className="btn-outline text-[0.75rem] sm:text-[0.8rem] px-3 py-1.5">Add to cart</button>
                </div>
            </div>
        );
    }

    // Bestseller variant - colorful arch cards
    if (variant === 'bestseller') {
        return (
            <div className={`bs-card ${book.bgClass} rounded-xl sm:rounded-2xl p-6 sm:p-8 relative overflow-hidden h-[350px] sm:h-[380px] md:h-[400px] flex flex-col group transition-transform hover:-translate-y-1 hover:shadow-xl cursor-pointer`}>
                <img
                    src={book.image}
                    alt={book.title}
                    className="w-[110px] sm:w-[130px] md:w-[140px] mx-auto mt-3 sm:mt-5 mb-8 sm:mb-10 transform -rotate-6 shadow-xl z-10 transition-transform group-hover:rotate-0 group-hover:scale-110"
                />
                <div className={`bs-details z-10 mt-auto ${book.bgClass?.includes('black') ? 'text-white' : ''}`}>
                    <h3 className={`font-serif text-[1.1rem] sm:text-[1.2rem] md:text-[1.3rem] mb-1 ${book.bgClass?.includes('black') ? 'text-white' : 'text-[#1a1a1a]'} line-clamp-2`}>
                        {book.title}
                    </h3>
                    <p className={`text-[0.75rem] sm:text-[0.8rem] mb-3 sm:mb-4 ${book.bgClass?.includes('black') ? 'text-gray-300' : 'text-gray-600 opacity-70'}`}>
                        By {book.author}
                    </p>
                    <div className="bs-price font-serif text-[1.3rem] sm:text-[1.4rem] md:text-[1.5rem] font-bold">{book.price}</div>
                </div>
                <div className="tag-read absolute bottom-0 right-0 bg-[#2ecc71] text-white text-[0.65rem] sm:text-[0.7rem] font-bold py-1.5 sm:py-2 px-4 sm:px-5 rounded-tl-xl sm:rounded-tl-2xl cursor-pointer z-20 hover:bg-[#27ae60] transition-colors">
                    Read now
                </div>
            </div>
        );
    }

    // Popular variant - colorful centered cards
    if (variant === 'popular') {
        return (
            <div className={`pop-card ${book.style} p-6 sm:p-8 rounded-xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer group`}>
                <img
                    src={book.image}
                    alt={book.title}
                    className="w-[110px] sm:w-[130px] md:w-[140px] mx-auto mb-5 sm:mb-6 shadow-2xl transition-transform duration-500 group-hover:scale-110"
                />
                <div className="pop-details">
                    <h3 className="font-serif text-[1rem] sm:text-[1.1rem] md:text-[1.2rem] mb-1 uppercase tracking-wide leading-tight line-clamp-2">
                        {book.title}
                    </h3>
                    <p className="text-[0.75rem] sm:text-[0.8rem] mb-3 sm:mb-4 opacity-80">By {book.author}</p>
                    <button className={`btn-outline text-[0.75rem] sm:text-[0.8rem] ${book.btnStyle}`}>Add to cart</button>
                    <div className="mt-3 sm:mt-4 font-bold text-[1rem] sm:text-[1.1rem]">{book.price}</div>
                </div>
            </div>
        );
    }

    return null;
};

export default BookCard;
