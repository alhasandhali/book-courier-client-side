import React from "react";
import { Link } from "react-router";

const BookCard = ({ book, variant = "default" }) => {
  // Default variant
  if (variant === "default") {
    return (
      <div className="book-card group cursor-pointer block relative">
        <Link to={`/book/${book._id}`}>
          <div className="card-cover-wrap bg-[#f2f2f2] rounded-xl h-[220px] sm:h-[250px] md:h-[280px] flex items-center justify-center mb-3 sm:mb-4 relative overflow-hidden transition-all duration-300 group-hover:shadow-lg">
            <img
              src={book.image}
              alt={book.title}
              className="h-[80%] w-auto shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:shadow-md"
            />
            {book.category && (
              <div className="absolute top-3 left-3 bg-accent-gold/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                {book.category}
              </div>
            )}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button className="bg-white text-text-main px-4 py-2 rounded-full font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg hover:bg-accent-gold hover:text-white">
                <i className="fa-solid fa-book-reader mr-2"></i>Borrow
              </button>
            </div>
          </div>
          <div className="book-info">
            <h3 className="font-serif text-[1rem] sm:text-[1.1rem] font-bold mb-1 text-card-black group-hover:text-accent-gold transition-colors line-clamp-1">
              {book.title}
            </h3>
            <p className="text-[0.85rem] text-text-muted mb-2 line-clamp-1">
              {book.author}
            </p>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="price font-serif font-bold text-[1.1rem] text-text-main group-hover:text-accent-gold transition-colors">
              {typeof book.price === 'number' ? `$${book.price.toFixed(2)}` : book.price}
            </div>
            {book.rating && (
              <div className="flex items-center gap-1">
                <i className="fa-solid fa-star text-yellow-400 text-xs"></i>
                <span className="text-sm font-semibold text-text-main">
                  {typeof book.rating === "object" ? book.rating.average : book.rating}
                </span>
                {typeof book.rating === "object" && book.rating.count && (
                  <span className="text-xs text-text-muted">({book.rating.count})</span>
                )}
              </div>
            )}
          </div>
        </Link>
      </div>
    );
  }

  // Recommended variant
  if (variant === "recommended") {
    return (
      <div className="book-card group cursor-pointer">
        <Link to={`/book/${book._id}`}>
          <div className="card-cover-wrap bg-paper-bg rounded-xl h-[220px] sm:h-[250px] md:h-[280px] flex items-center justify-center mb-3 sm:mb-4 relative overflow-hidden transition-all duration-300 group-hover:shadow-md border border-transparent group-hover:border-[#e5e5e5]">
            <img
              src={book.image}
              alt={book.title}
              className="h-[80%] w-auto shadow-sm transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="book-info">
            <h3 className="font-serif text-[1rem] sm:text-[1.1rem] font-bold mb-1 text-card-black group-hover:text-accent-gold transition-colors line-clamp-1">
              {book.title}
            </h3>
            <p className="text-[0.85rem] text-text-muted mb-2 line-clamp-1">
              By {book.author}
            </p>
            {book.rating && (
              <div className="book-rating text-[0.8rem] font-semibold flex items-center gap-1 mb-3 text-orange-400">
                <i className="fa-solid fa-star text-[0.7rem]"></i>
                <span className="text-text-main">
                  {typeof book.rating === "object"
                    ? book.rating.average
                    : book.rating}
                </span>
              </div>
            )}
          </div>
        </Link>
        <div className="card-actions flex justify-between items-center gap-2 mt-auto">
          <span className="price font-serif font-bold text-[1.1rem] text-text-main">
            {book.price}
          </span>
          <button className="btn-outline border-slate-300 hover:border-accent-gold hover:bg-accent-gold hover:text-white transition-all text-[0.8rem] px-4 py-2 rounded-full">
            Borrow
          </button>
        </div>
      </div>
    );
  }

  // Bestseller variant
  if (variant === "bestseller") {
    return (
      <Link
        to={`/book/${book._id}`}
        className={`bs-card ${book.bgClass} rounded-2xl p-6 sm:p-8 relative overflow-hidden h-[350px] sm:h-[380px] md:h-[400px] flex flex-col group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer ring-1 ring-black/5`}
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-700"></div>

        <img
          src={book.image}
          alt={book.title}
          className="w-[110px] sm:w-[130px] md:w-[140px] mx-auto mt-3 sm:mt-5 mb-6 sm:mb-8 transform -rotate-6 shadow-2xl z-10 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110"
        />
        <div
          className={`bs-details z-10 mt-auto ${book.bgClass?.includes("black") ? "text-white" : "text-text-main"
            }`}
        >
          <h3 className="font-serif text-[1.2rem] sm:text-[1.35rem] mb-1 leading-tight line-clamp-2 font-bold">
            {book.title}
          </h3>
          <p
            className={`text-[0.85rem] mb-3 sm:mb-4 ${book.bgClass?.includes("black")
              ? "text-gray-300"
              : "text-gray-600"
              } font-medium`}
          >
            By {book.author}
          </p>
          <div className="bs-price font-serif text-[1.4rem] sm:text-[1.5rem] font-bold tracking-tight">
            {book.price}
          </div>
        </div>
        <div className="tag-read absolute bottom-0 right-0 bg-[#2ecc71] text-white text-[0.7rem] font-bold py-2 px-5 rounded-tl-2xl cursor-pointer z-20 hover:bg-[#27ae60] transition-all group-hover:pr-7">
          Read now{" "}
          <i className="fa-solid fa-arrow-right ml-1 opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-1/2 -translate-y-1/2"></i>
        </div>
      </Link>
    );
  }

  // Popular variant
  if (variant === "popular") {
    return (
      <Link
        to={`/book/${book._id}`}
        className={`pop-card ${book.style} p-6 sm:p-8 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer group border border-transparent hover:border-black/5 bg-white`}
      >
        <div className="relative inline-block mx-auto mb-6">
          <img
            src={book.image}
            alt={book.title}
            className="w-[110px] sm:w-[130px] md:w-[140px] shadow-lg transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl"
          />
        </div>
        <div className="pop-details">
          <h3 className="font-serif text-[1.1rem] sm:text-[1.2rem] mb-2 uppercase tracking-wide leading-tight line-clamp-1 font-bold text-text-main group-hover:text-accent-gold transition-colors">
            {book.title}
          </h3>
          <p className="text-[0.85rem] mb-4 text-text-muted font-medium">
            By {book.author}
          </p>
          <div className="flex flex-col items-center gap-3">
            <div className="font-bold font-serif text-[1.2rem] text-text-main">
              {book.price}
            </div>
            <button
              className={`btn-outline ${book.btnStyle} rounded-full px-6 hover:scale-105 transition-transform active:scale-95`}
            >
              Borrow
            </button>
          </div>
        </div>
      </Link>
    );
  }

  return null;
};

export default BookCard;
