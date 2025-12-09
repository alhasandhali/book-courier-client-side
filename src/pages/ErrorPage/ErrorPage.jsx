import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouteError, Link } from 'react-router';

const ErrorPage = () => {
    const error = useRouteError();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        let rafId = null;
        let lastTime = 0;
        const throttleDelay = 50;

        const handleMouseMove = (e) => {
            const now = Date.now();
            if (now - lastTime < throttleDelay) return;

            lastTime = now;
            if (rafId) cancelAnimationFrame(rafId);

            rafId = requestAnimationFrame(() => {
                setMousePosition({
                    x: (e.clientX / window.innerWidth - 0.5) * 15,
                    y: (e.clientY / window.innerHeight - 0.5) * 15
                });
            });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    const parallaxStyle = useMemo(() => ({
        transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        willChange: 'transform'
    }), [mousePosition.x, mousePosition.y]);

    const textParallaxStyle = useMemo(() => ({
        transform: `translate(${mousePosition.x * -0.2}px, ${mousePosition.y * -0.2}px)`,
        willChange: 'transform'
    }), [mousePosition.x, mousePosition.y]);

    return (
        <div className="h-screen relative overflow-hidden bg-gradient-to-br from-bg-body via-paper-bg to-[#f3ede7] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[15%] left-[8%] w-40 h-40 sm:w-56 sm:h-56 bg-accent-gold/10 rounded-full blur-3xl animate-float-slow" />
                <div className="absolute bottom-[20%] right-[10%] w-48 h-48 sm:w-64 sm:h-64 bg-accent-green/10 rounded-full blur-3xl animate-float-slower" />
                <div className="absolute top-[20%] right-[20%] text-accent-gold/20 text-2xl animate-twinkle">✦</div>
                <div className="absolute bottom-[30%] left-[15%] text-accent-gold/20 text-3xl animate-twinkle-slow">✦</div>
            </div>

            <div className={`relative z-10 max-w-3xl w-full text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="relative mb-6 sm:mb-10 flex items-center justify-center" style={parallaxStyle}>
                    <div className="absolute -left-6 sm:-left-10 top-0 animate-float">
                        <div className="w-14 h-18 sm:w-20 sm:h-24 bg-gradient-to-br from-card-blue to-[#8bc5cd] rounded shadow-2xl -rotate-12" />
                    </div>
                    <div className="absolute -right-6 sm:-right-10 top-2 animate-float-slow">
                        <div className="w-14 h-18 sm:w-20 sm:h-24 bg-gradient-to-br from-card-yellow to-[#e8c84a] rounded shadow-2xl rotate-12" />
                    </div>
                    <div className="absolute -bottom-8 sm:-bottom-10 animate-float-slower">
                        <div className="w-16 h-20 sm:w-24 sm:h-28 bg-gradient-to-br from-card-purple to-[#8a6d75] rounded shadow-2xl rotate-6" />
                    </div>

                    <h1
                        className="text-[7rem] sm:text-[10rem] lg:text-[14rem] font-bold font-serif leading-none bg-gradient-to-br from-accent-gold via-[#d4a574] to-[#b8865f] bg-clip-text text-transparent animate-pulse-slow select-none"
                        style={textParallaxStyle}
                    >
                        404
                    </h1>
                </div>

                <div className={`space-y-3 sm:space-y-5 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-text-main px-4">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-text-muted max-w-xl mx-auto px-4">
                        The page you're looking for has wandered off. Let's get you back on track!
                    </p>

                    {error && (
                        <div className="max-w-lg mx-auto mt-4 px-4">
                            <div className="bg-white/70 backdrop-blur-sm border border-accent-gold/20 rounded-xl p-3 sm:p-4 shadow-md">
                                <p className="text-xs sm:text-sm font-mono font-bold text-accent-gold break-words uppercase">
                                    {error.statusText || error.message}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-10 px-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <Link
                        to="/"
                        className="group relative px-6 py-3 sm:px-8 sm:py-3.5 bg-gradient-to-r from-accent-gold to-[#d4a574] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Back to Home
                        </span>
                    </Link>

                    <Link
                        to="/books"
                        className="px-6 py-3 sm:px-8 sm:py-3.5 bg-white border-2 border-accent-gold text-accent-gold font-semibold rounded-full shadow-md hover:shadow-lg hover:bg-accent-gold hover:text-white hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            Browse Books
                        </span>
                    </Link>
                </div>

                <div className={`mt-6 sm:mt-10 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-xs sm:text-sm text-text-muted mb-2">Need help?</p>
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm">
                        <Link to="/contact" className="text-accent-gold hover:underline hover:text-[#d4a574] transition-colors">
                            Contact Support
                        </Link>
                        <span className="text-text-muted/30">•</span>
                        <Link to="/about" className="text-accent-gold hover:underline hover:text-[#d4a574] transition-colors">
                            About Us
                        </Link>
                        <span className="text-text-muted/30">•</span>
                        <Link to="/faq" className="text-accent-gold hover:underline hover:text-[#d4a574] transition-colors">
                            FAQ
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;

