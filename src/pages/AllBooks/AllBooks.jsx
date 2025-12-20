import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import useAxios from '../../hooks/useAxios';
import BookCard from '../../components/BookCard/BookCard';

const AllBooks = () => {
    const axiosPublic = useAxios();
    const [sortBy, setSortBy] = useState('newest');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [minRating, setMinRating] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategories, priceRange, minRating, sortBy, searchTerm]);

    // Update state when URL changes
    useEffect(() => {
        const query = searchParams.get('search') || "";
        if (query !== searchTerm) {
            setSearchTerm(query);
        }
    }, [searchParams]);

    // Update URL when search term changes (optional but good for syncing)
    const handleSearchChange = (value) => {
        setSearchTerm(value);
        if (value) {
            setSearchParams({ search: value });
        } else {
            setSearchParams({});
        }
    };

    const parsePrice = (price) => {
        if (typeof price === 'number') return price;
        if (typeof price === 'string') {
            return parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
        }
        return 0;
    };

    const { data: books = [], isLoading } = useQuery({
        queryKey: ['allBooks'],
        queryFn: async () => {
            const res = await axiosPublic.get('/books');
            return res.data;
        },
    });

    const categories = useMemo(() => {
        const cats = new Set();
        books.forEach(book => {
            if (book.category) cats.add(book.category);
        });
        return Array.from(cats);
    }, [books]);

    const filteredAndSortedBooks = useMemo(() => {
        let filtered = [...books];

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(book =>
                book.title?.toLowerCase().includes(term) ||
                book.author?.toLowerCase().includes(term) ||
                book.category?.toLowerCase().includes(term)
            );
        }

        if (selectedCategories.length > 0) {
            filtered = filtered.filter(book =>
                selectedCategories.includes(book.category)
            );
        }

        filtered = filtered.filter(book => {
            const price = parsePrice(book.price);
            return price >= priceRange[0] && price <= priceRange[1];
        });

        if (minRating > 0) {
            filtered = filtered.filter(book => {
                const rating = typeof book.rating === 'object'
                    ? book.rating.average
                    : book.rating || 0;
                return rating >= minRating;
            });
        }

        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return parsePrice(a.price) - parsePrice(b.price);
                case 'price-high':
                    return parsePrice(b.price) - parsePrice(a.price);
                case 'rating':
                    const ratingA = typeof a.rating === 'object' ? a.rating.average : a.rating || 0;
                    const ratingB = typeof b.rating === 'object' ? b.rating.average : b.rating || 0;
                    return ratingB - ratingA;
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'newest':
                default:
                    return 0;
            }
        });

        return filtered;
    }, [books, selectedCategories, priceRange, minRating, sortBy]);

    const totalPages = Math.ceil(filteredAndSortedBooks.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentBooks = filteredAndSortedBooks.slice(startIndex, startIndex + itemsPerPage);

    const handleCategoryToggle = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setPriceRange([0, 100]);
        setMinRating(0);
        setSortBy('newest');
        setSearchTerm("");
        setSearchParams({});
        setCurrentPage(1);
    };

    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const hasActiveFilters = selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000 || minRating > 0 || searchTerm;

    return (
        <div className="min-h-screen bg-bg-body">
            <div className="w-11/12 sm:w-10/12 mx-auto py-6 sm:py-8 lg:py-10">
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-main mb-2">
                        All Books
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base">
                        Discover our complete collection of {books.length} books
                    </p>
                </div>

                <div className="mb-8 max-w-2xl">
                    <div className="relative group">
                        <i className="fa-solid fa-search absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-gold transition-colors"></i>
                        <input
                            type="text"
                            placeholder="Search by title, author, or category..."
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="w-full py-4 pl-12 pr-6 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-gold/20 focus:border-accent-gold transition-all text-sm sm:text-base"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => handleSearchChange("")}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-text-muted hover:text-red-500 transition-colors"
                            >
                                <i className="fa-solid fa-circle-xmark"></i>
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex gap-6 lg:gap-8">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden fixed bottom-6 right-6 z-50 bg-accent-gold text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                    </button>

                    <aside className={`
                        fixed lg:sticky top-0 left-0 h-screen lg:h-auto
                        w-80 lg:w-64 xl:w-72 flex-shrink-0
                        bg-white lg:bg-transparent
                        shadow-2xl lg:shadow-none
                        z-[100] lg:z-auto
                        transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                        overflow-y-auto
                        p-8 lg:p-0
                    `}>
                        <div className="lg:sticky lg:top-24">
                            <div className="flex items-center justify-between mb-8 lg:hidden">
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-text-main">
                                        Filters
                                    </h2>
                                    <p className="text-xs text-text-muted font-medium uppercase tracking-wider mt-1">Refine your search</p>
                                </div>
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-text-muted hover:text-red-500 transition-colors shadow-sm"
                                >
                                    <i className="fa-solid fa-times"></i>
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/50">
                                    <h3 className="font-serif font-bold text-lg mb-4 text-text-main flex items-center gap-2">
                                        <i className="fa-solid fa-sort-amount-down text-accent-gold text-sm"></i> Sort By
                                    </h3>
                                    <div className="space-y-2.5">
                                        {[
                                            { value: 'newest', label: 'Newest First' },
                                            { value: 'price-low', label: 'Price: Low to High' },
                                            { value: 'price-high', label: 'Price: High to Low' },
                                            { value: 'rating', label: 'Highest Rated' },
                                            { value: 'title', label: 'Title: A-Z' },
                                        ].map(option => (
                                            <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="radio"
                                                    name="sort"
                                                    value={option.value}
                                                    checked={sortBy === option.value}
                                                    onChange={(e) => setSortBy(e.target.value)}
                                                    className="radio radio-xs radio-primary"
                                                />
                                                <span className={`text-sm transition-colors ${sortBy === option.value ? 'text-text-main font-bold' : 'text-text-muted group-hover:text-text-main'}`}>
                                                    {option.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {categories.length > 0 && (
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/50">
                                        <h3 className="font-serif font-bold text-lg mb-4 text-text-main flex items-center gap-2">
                                            <i className="fa-solid fa-layer-group text-accent-gold text-sm"></i> Categories
                                        </h3>
                                        <div className="space-y-2.5 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                            {categories.map(category => (
                                                <label key={category} className="flex items-center gap-3 cursor-pointer group">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCategories.includes(category)}
                                                        onChange={() => handleCategoryToggle(category)}
                                                        className="checkbox checkbox-xs checkbox-primary rounded"
                                                    />
                                                    <span className={`text-sm transition-colors ${selectedCategories.includes(category) ? 'text-text-main font-bold' : 'text-text-muted group-hover:text-text-main'}`}>
                                                        {category}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/50">
                                    <h3 className="font-serif font-bold text-lg mb-4 text-text-main flex items-center gap-2">
                                        <i className="fa-solid fa-tags text-accent-gold text-sm"></i> Price Range
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-xs font-bold text-text-muted">
                                            <span>$0</span>
                                            <span className="bg-accent-gold/10 text-accent-gold px-2 py-1 rounded-md">${priceRange[1]}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="1000"
                                            step="10"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                            className="range range-xs range-primary"
                                        />
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/50">
                                    <h3 className="font-serif font-bold text-lg mb-4 text-text-main flex items-center gap-2">
                                        <i className="fa-solid fa-star text-accent-gold text-sm"></i> Min Rating
                                    </h3>
                                    <div className="space-y-2.5">
                                        {[
                                            { value: 0, label: 'All Ratings' },
                                            { value: 3, label: '3.0+' },
                                            { value: 4, label: '4.0+' },
                                            { value: 4.5, label: '4.5+' },
                                        ].map(option => (
                                            <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    value={option.value}
                                                    checked={minRating === option.value}
                                                    onChange={() => setMinRating(option.value)}
                                                    className="radio radio-xs radio-primary"
                                                />
                                                <span className={`text-sm transition-colors flex items-center gap-1.5 ${minRating === option.value ? 'text-text-main font-bold' : 'text-text-muted group-hover:text-text-main'}`}>
                                                    {option.label}
                                                    {option.value > 0 && (
                                                        <i className="fa-solid fa-star text-yellow-400 text-[10px]"></i>
                                                    )}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="w-full bg-red-50 text-red-600 py-3.5 rounded-xl font-bold hover:bg-red-100 transition-all text-xs uppercase tracking-wider border border-red-100/50 flex items-center justify-center gap-2"
                                    >
                                        <i className="fa-solid fa-trash-can"></i> Clear All Filters
                                    </button>
                                )}
                            </div>
                        </div>
                    </aside>

                    {isSidebarOpen && (
                        <div
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] lg:hidden animate-in fade-in duration-300"
                        />
                    )}

                    <main className="flex-1 min-w-0">
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-sm sm:text-base text-text-muted">
                                Showing <span className="font-semibold text-text-main">{filteredAndSortedBooks.length}</span> of {books.length} books
                            </p>
                        </div>

                        {isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="animate-pulse">
                                        <div className="bg-gray-200 rounded-xl h-64 mb-4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                ))}
                            </div>
                        ) : filteredAndSortedBooks.length === 0 ? (
                            <div className="text-center py-16 sm:py-20">
                                <div className="text-6xl sm:text-7xl mb-4">📚</div>
                                <h3 className="text-xl sm:text-2xl font-serif font-bold text-text-main mb-2">
                                    No Books Found
                                </h3>
                                <p className="text-text-muted mb-6">
                                    Try adjusting your filters to see more results
                                </p>
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="btn-primary"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 mb-10">
                                    {currentBooks.map((book) => (
                                        <BookCard key={book._id} book={book} variant="default" />
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-text-muted hover:border-accent-gold hover:text-accent-gold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-text-muted transition-all"
                                        >
                                            <i className="fa-solid fa-chevron-left"></i>
                                        </button>

                                        <div className="flex gap-2">
                                            {[...Array(totalPages)].map((_, idx) => {
                                                const pageNumber = idx + 1;
                                                if (totalPages > 7) {
                                                    if (
                                                        pageNumber === 1 ||
                                                        pageNumber === totalPages ||
                                                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                                    ) {
                                                        return (
                                                            <button
                                                                key={pageNumber}
                                                                onClick={() => setCurrentPage(pageNumber)}
                                                                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${currentPage === pageNumber
                                                                    ? 'bg-accent-gold text-white shadow-md transform scale-105'
                                                                    : 'border border-gray-200 text-text-muted hover:border-accent-gold hover:text-accent-gold'
                                                                    }`}
                                                            >
                                                                {pageNumber}
                                                            </button>
                                                        );
                                                    } else if (
                                                        (pageNumber === currentPage - 2 && currentPage > 3) ||
                                                        (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
                                                    ) {
                                                        return <span key={pageNumber} className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>;
                                                    }
                                                    return null;
                                                }

                                                return (
                                                    <button
                                                        key={pageNumber}
                                                        onClick={() => setCurrentPage(pageNumber)}
                                                        className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${currentPage === pageNumber
                                                            ? 'bg-accent-gold text-white shadow-md transform scale-105'
                                                            : 'border border-gray-200 text-text-muted hover:border-accent-gold hover:text-accent-gold'
                                                            }`}
                                                    >
                                                        {pageNumber}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-text-muted hover:border-accent-gold hover:text-accent-gold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-text-muted transition-all"
                                        >
                                            <i className="fa-solid fa-chevron-right"></i>
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AllBooks;
