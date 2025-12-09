import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const About = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [counters, setCounters] = useState({ books: 0, users: 0, deliveries: 0 });

    useEffect(() => {
        setIsVisible(true);

        const animateCounters = () => {
            const targets = { books: 10000, users: 5000, deliveries: 15000 };
            const duration = 2000;
            const steps = 60;
            const increment = {
                books: targets.books / steps,
                users: targets.users / steps,
                deliveries: targets.deliveries / steps
            };

            let currentStep = 0;
            const timer = setInterval(() => {
                if (currentStep < steps) {
                    setCounters({
                        books: Math.floor(increment.books * currentStep),
                        users: Math.floor(increment.users * currentStep),
                        deliveries: Math.floor(increment.deliveries * currentStep)
                    });
                    currentStep++;
                } else {
                    setCounters(targets);
                    clearInterval(timer);
                }
            }, duration / steps);

            return () => clearInterval(timer);
        };

        const timeout = setTimeout(animateCounters, 500);
        return () => clearTimeout(timeout);
    }, []);

    const features = [
        {
            icon: '📚',
            title: 'Vast Collection',
            description: 'Access thousands of books across all genres, from classics to latest releases.'
        },
        {
            icon: '🚀',
            title: 'Fast Delivery',
            description: 'Get your books delivered to your doorstep within 24-48 hours.'
        },
        {
            icon: '💰',
            title: 'Affordable Pricing',
            description: 'Enjoy competitive prices and special discounts on bulk orders.'
        },
        {
            icon: '🔒',
            title: 'Secure Transactions',
            description: 'Your payments and personal information are always protected.'
        }
    ];

    const values = [
        {
            title: 'Quality First',
            description: 'We ensure every book is in excellent condition before delivery.',
            icon: '⭐'
        },
        {
            title: 'Customer Focused',
            description: 'Your satisfaction is our top priority, always.',
            icon: '❤️'
        },
        {
            title: 'Innovation',
            description: 'Constantly improving our service with latest technology.',
            icon: '💡'
        }
    ];

    return (
        <div className="min-h-screen bg-bg-body">
            <section className="relative overflow-hidden bg-gradient-to-br from-accent-gold/10 via-bg-body to-accent-green/10 py-16 sm:py-20 lg:py-24">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] right-[5%] w-64 h-64 bg-accent-gold/10 rounded-full blur-3xl animate-float-slow" />
                    <div className="absolute bottom-[10%] left-[5%] w-80 h-80 bg-accent-green/10 rounded-full blur-3xl animate-float-slower" />
                </div>

                <div className={`relative z-10 w-11/12 sm:w-10/12 max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-text-main mb-4 sm:mb-6">
                        About BookCourier
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed">
                        Delivering knowledge and stories to your doorstep, one book at a time.
                    </p>
                </div>
            </section>

            <section className="w-11/12 sm:w-10/12 max-w-6xl mx-auto py-12 sm:py-16 lg:py-20">
                <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 items-center transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-main mb-4 sm:mb-6">
                            Our Story
                        </h2>
                        <div className="space-y-4 text-text-muted leading-relaxed">
                            <p>
                                Founded in 2020, BookCourier was born from a simple idea: making books more accessible to everyone. We noticed that many book lovers struggled to find the titles they wanted locally, and online shopping often meant long waits.
                            </p>
                            <p>
                                We set out to change that. By combining a vast digital catalog with lightning-fast local delivery, we've created a service that brings the joy of reading to your doorstep faster than ever before.
                            </p>
                            <p>
                                Today, we're proud to serve thousands of readers across the country, delivering everything from bestsellers to rare finds, all while maintaining our commitment to quality and customer satisfaction.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="bg-gradient-to-br from-accent-gold/20 to-accent-green/20 rounded-2xl p-8 sm:p-10 backdrop-blur-sm border border-accent-gold/20">
                            <div className="text-6xl sm:text-7xl mb-4">📖</div>
                            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-text-main mb-3">
                                Our Mission
                            </h3>
                            <p className="text-text-muted leading-relaxed">
                                To make reading accessible, affordable, and enjoyable for everyone by providing the fastest and most reliable book delivery service.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-br from-paper-bg to-bg-body py-12 sm:py-16 lg:py-20">
                <div className="w-11/12 sm:w-10/12 max-w-6xl mx-auto">
                    <div className={`text-center mb-10 sm:mb-12 lg:mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-main mb-4">
                            Why Choose Us
                        </h2>
                        <p className="text-text-muted text-lg max-w-2xl mx-auto">
                            We're more than just a book delivery service
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl p-6 sm:p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${400 + index * 100}ms` }}
                            >
                                <div className="text-5xl sm:text-6xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl sm:text-2xl font-serif font-bold text-text-main mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-text-muted leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-11/12 sm:w-10/12 max-w-6xl mx-auto py-12 sm:py-16 lg:py-20">
                <div className={`text-center mb-10 sm:mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-main mb-4">
                        Our Impact
                    </h2>
                    <p className="text-text-muted text-lg">
                        Numbers that tell our story
                    </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
                    <div className={`bg-gradient-to-br from-accent-gold/10 to-accent-gold/5 rounded-2xl p-8 sm:p-10 text-center border border-accent-gold/20 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-accent-gold mb-2">
                            {counters.books.toLocaleString()}+
                        </div>
                        <div className="text-lg sm:text-xl text-text-muted font-medium">
                            Books Available
                        </div>
                    </div>
                    <div className={`bg-gradient-to-br from-accent-green/10 to-accent-green/5 rounded-2xl p-8 sm:p-10 text-center border border-accent-green/20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-accent-green mb-2">
                            {counters.users.toLocaleString()}+
                        </div>
                        <div className="text-lg sm:text-xl text-text-muted font-medium">
                            Happy Readers
                        </div>
                    </div>
                    <div className={`bg-gradient-to-br from-accent-gold/10 to-accent-green/10 rounded-2xl p-8 sm:p-10 text-center border border-accent-gold/20 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-accent-gold mb-2">
                            {counters.deliveries.toLocaleString()}+
                        </div>
                        <div className="text-lg sm:text-xl text-text-muted font-medium">
                            Books Delivered
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-br from-paper-bg to-bg-body py-12 sm:py-16 lg:py-20">
                <div className="w-11/12 sm:w-10/12 max-w-6xl mx-auto">
                    <div className={`text-center mb-10 sm:mb-12 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-main mb-4">
                            Our Values
                        </h2>
                        <p className="text-text-muted text-lg">
                            What drives us every day
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${1000 + index * 100}ms` }}
                            >
                                <div className="text-5xl mb-4">{value.icon}</div>
                                <h3 className="text-xl sm:text-2xl font-serif font-bold text-text-main mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-text-muted leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-11/12 sm:w-10/12 max-w-4xl mx-auto py-12 sm:py-16 lg:py-20">
                <div className={`bg-gradient-to-r from-accent-gold to-[#d4a574] rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white transition-all duration-1000 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4 sm:mb-6">
                        Ready to Start Reading?
                    </h2>
                    <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90">
                        Explore our vast collection and get your favorite books delivered fast!
                    </p>
                    <Link
                        to="/books"
                        className="inline-block bg-white text-accent-gold px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                        Browse Books
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default About;
