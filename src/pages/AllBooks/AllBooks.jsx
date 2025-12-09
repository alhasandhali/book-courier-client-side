import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import BookCard from '../../components/BookCard/BookCard';

const AllBooks = () => {
    const axiosPublic = useAxios();
    const [sortBy, setSortBy] = useState('newest');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [minRating, setMinRating] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    };

    const hasActiveFilters = selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 100 || minRating > 0;

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
                        w-72 lg:w-64 xl:w-72 flex-shrink-0
                        bg-white lg:bg-transparent
                        shadow-2xl lg:shadow-none
                        z-40 lg:z-auto
                        transition-transform duration-300
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                        overflow-y-auto
                        p-6 lg:p-0
                    `}>
                        <div className="lg:sticky lg:top-6">
                            <div className="flex items-center justify-between mb-6 lg:mb-0">
                                <h2 className="text-xl font-serif font-bold text-text-main lg:hidden">
                                    Filters & Sort
                                </h2>
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="lg:hidden text-text-muted hover:text-text-main"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                    <h3 className="font-serif font-bold text-lg mb-4 text-text-main">Sort By</h3>
                                    <div className="space-y-2">
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
                                                    className="w-4 h-4 text-accent-gold focus:ring-accent-gold"
                                                />
                                                <span className="text-sm text-text-muted group-hover:text-text-main transition-colors">
                                                    {option.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {categories.length > 0 && (
                                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                        <h3 className="font-serif font-bold text-lg mb-4 text-text-main">Categories</h3>
                                        <div className="space-y-2 max-h-48 overflow-y-auto">
                                            {categories.map(category => (
                                                <label key={category} className="flex items-center gap-3 cursor-pointer group">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCategories.includes(category)}
                                                        onChange={() => handleCategoryToggle(category)}
                                                        className="w-4 h-4 text-accent-gold rounded focus:ring-accent-gold"
                                                    />
                                                    <span className="text-sm text-text-muted group-hover:text-text-main transition-colors">
                                                        {category}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                    <h3 className="font-serif font-bold text-lg mb-4 text-text-main">Price Range</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-text-muted">${priceRange[0]}</span>
                                            <span className="text-text-muted">${priceRange[1]}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-gold"
                                        />
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                    <h3 className="font-serif font-bold text-lg mb-4 text-text-main">Rating</h3>
                                    <div className="space-y-2">
                                        {[
                                            { value: 0, label: 'All Ratings' },
                                            { value: 3, label: '3+ Stars' },
                                            { value: 4, label: '4+ Stars' },
                                            { value: 4.5, label: '4.5+ Stars' },
                                        ].map(option => (
                                            <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    value={option.value}
                                                    checked={minRating === option.value}
                                                    onChange={() => setMinRating(option.value)}
                                                    className="w-4 h-4 text-accent-gold focus:ring-accent-gold"
                                                />
                                                <span className="text-sm text-text-muted group-hover:text-text-main transition-colors flex items-center gap-1">
                                                    {option.label}
                                                    {option.value > 0 && (
                                                        <i className="fa-solid fa-star text-yellow-400 text-xs"></i>
                                                    )}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="w-full bg-red-50 text-red-600 py-3 rounded-lg font-medium hover:bg-red-100 transition-colors text-sm"
                                    >
                                        Clear All Filters
                                    </button>
                                )}
                            </div>
                        </div>
                    </aside>

                    {isSidebarOpen && (
                        <div
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                                {filteredAndSortedBooks.map((book) => (
                                    <BookCard key={book._id} book={book} variant="default" />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AllBooks;
