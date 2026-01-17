import React from 'react';

const DashboardLoading = ({ fullScreen = false }) => {
    return (
        <div className={`flex flex-col justify-center items-center ${fullScreen ? 'fixed inset-0 z-[9999]' : 'h-64 w-full'} bg-bg-body font-sans`}>
            <div className="relative flex flex-col items-center">
                {/* Decorative background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-gold/20 rounded-full blur-[40px] animate-pulse"></div>

                {/* Animated Logo/Icon Area */}
                <div className="relative mb-6">
                    {/* Spinning ring */}
                    <div className="w-20 h-20 border-2 border-accent-gold/10 border-t-accent-gold rounded-full animate-spin"></div>

                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-accent-gold/10 rounded-lg flex items-center justify-center animate-pulse">
                            <svg
                                className="w-6 h-6 text-accent-gold"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="text-center">
                    <h2 className="text-2xl font-serif font-bold text-text-main mb-2 tracking-tight">
                        Book <span className="text-accent-gold">Courier</span>
                    </h2>
                    <div className="flex items-center justify-center gap-1">
                        <span className="text-text-muted text-xs font-medium uppercase tracking-widest">Loading Dashboard</span>
                        <div className="flex gap-0.5">
                            <span className="w-1 h-1 bg-accent-gold rounded-full animate-bounce [animation-delay:-0.32s]"></span>
                            <span className="w-1 h-1 bg-accent-gold rounded-full animate-bounce [animation-delay:-0.16s]"></span>
                            <span className="w-1 h-1 bg-accent-gold rounded-full animate-bounce"></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle Progress Bar */}
            <div className="mt-12 w-48 h-1 bg-accent-gold/10 rounded-full overflow-hidden">
                <div className="h-full bg-accent-gold rounded-full animate-[loading_2s_ease-in-out_infinite] origin-left"></div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes loading {
                    0% { transform: scaleX(0); opacity: 0; }
                    50% { transform: scaleX(1); opacity: 1; }
                    100% { transform: scaleX(0); transform-origin: right; opacity: 0; }
                }
            `}} />
        </div>
    );
};

export default DashboardLoading;
