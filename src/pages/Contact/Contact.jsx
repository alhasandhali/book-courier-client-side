import React, { useState } from 'react';

const Contact = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [formStatus, setFormStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    React.useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus({ type: '', message: '' });

        // Simulate form submission
        setTimeout(() => {
            setFormStatus({
                type: 'success',
                message: 'Thank you for contacting us! We\'ll get back to you within 24 hours.'
            });
            setFormData({ name: '', email: '', subject: '', message: '' });
            setIsSubmitting(false);
        }, 1500);
    };

    const contactInfo = [
        {
            icon: '📧',
            title: 'Email',
            value: 'support@bookcourier.com',
            link: 'mailto:support@bookcourier.com'
        },
        {
            icon: '📱',
            title: 'Phone',
            value: '+1 (555) 123-4567',
            link: 'tel:+15551234567'
        },
        {
            icon: '📍',
            title: 'Address',
            value: '123 Book Street, Reading City, RC 12345',
            link: null
        },
        {
            icon: '🕐',
            title: 'Business Hours',
            value: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM',
            link: null
        }
    ];

    const socialLinks = [
        { icon: 'fa-facebook-f', name: 'Facebook', color: 'hover:text-blue-600' },
        { icon: 'fa-twitter', name: 'Twitter', color: 'hover:text-blue-400' },
        { icon: 'fa-instagram', name: 'Instagram', color: 'hover:text-pink-600' },
        { icon: 'fa-linkedin-in', name: 'LinkedIn', color: 'hover:text-blue-700' }
    ];

    return (
        <div className="min-h-screen bg-bg-body overflow-x-hidden">
            <section className="relative overflow-hidden bg-gradient-to-br from-accent-gold/10 via-bg-body to-accent-green/10 py-16 sm:py-20 lg:py-24">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] right-[5%] w-64 h-64 bg-accent-gold/10 rounded-full blur-3xl animate-float-slow" />
                    <div className="absolute bottom-[10%] left-[5%] w-80 h-80 bg-accent-green/10 rounded-full blur-3xl animate-float-slower" />
                </div>

                <div className={`relative z-10 w-11/12 sm:w-10/12 max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-text-main mb-4 sm:mb-6">
                        Get In Touch
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
            </section>

            <section className="w-11/12 sm:w-10/12 max-w-6xl mx-auto py-12">
                <div className="grid lg:grid-cols-5 gap-y-6 lg:gap-6">
                    <div className={`lg:col-span-3 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} px-0`}>
                        <div className="bg-bg-card rounded-2xl p-6 lg:p-10 shadow-lg border border-card-border">
                            <h2 className="text-2xl font-serif font-bold text-text-main mb-6">
                                Send us a Message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-text-main mb-2">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all outline-none bg-bg-body text-text-main"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-text-main mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all outline-none bg-bg-body text-text-main"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-text-main mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all outline-none bg-bg-body text-text-main"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-text-main mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="6"
                                        className="w-full px-4 py-3 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all outline-none resize-none bg-bg-body text-text-main"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </div>

                                {formStatus.message && (
                                    <div className={`p-4 rounded-lg ${formStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                                        {formStatus.message}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-accent-gold to-[#d4a574] text-white py-4 rounded-lg font-semibold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className={`lg:col-span-2 space-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} px-0`}>
                        <div className="bg-bg-card rounded-2xl p-6 lg:p-10 shadow-lg border border-card-border">
                            <h2 className="text-2xl font-serif font-bold text-text-main mb-6">
                                Contact Information
                            </h2>
                            <div className="space-y-5">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="text-3xl flex-shrink-0">{info.icon}</div>
                                        <div>
                                            <h3 className="font-semibold text-text-main mb-1">
                                                {info.title}
                                            </h3>
                                            {info.link ? (
                                                <a
                                                    href={info.link}
                                                    className="text-text-muted hover:text-accent-gold transition-colors"
                                                >
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p className="text-text-muted">{info.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-accent-gold/10 to-accent-green/10 rounded-2xl p-6 lg:p-10 border border-accent-gold/20">
                            <h3 className="text-xl font-serif font-bold text-text-main mb-4">
                                Follow Us
                            </h3>
                            <div className="flex gap-4">
                                <a
                                    href="#"
                                    className="w-12 h-12 bg-bg-body border border-card-border rounded-full flex items-center justify-center text-text-muted hover:text-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                    aria-label="Facebook"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="w-12 h-12 bg-bg-card border border-card-border rounded-full flex items-center justify-center text-text-muted hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                    aria-label="Twitter"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="w-12 h-12 bg-bg-card border border-card-border rounded-full flex items-center justify-center text-text-muted hover:text-pink-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                    aria-label="Instagram"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="w-12 h-12 bg-bg-card border border-card-border rounded-full flex items-center justify-center text-text-muted hover:text-blue-700 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                    aria-label="LinkedIn"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-br from-paper-bg to-bg-body py-12 sm:py-16">
                <div className={`w-11/12 sm:w-10/12 max-w-6xl mx-auto text-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-text-main mb-4">
                        Prefer to chat?
                    </h2>
                    <p className="text-text-muted text-lg mb-6">
                        Our customer support team is available during business hours
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="tel:+15551234567"
                            className="inline-flex items-center justify-center gap-2 bg-accent-gold text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            <i className="fas fa-phone"></i>
                            Call Us Now
                        </a>
                        <a
                            href="mailto:support@bookcourier.com"
                            className="inline-flex items-center justify-center gap-2 bg-white border-2 border-accent-gold text-accent-gold px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            <i className="fas fa-envelope"></i>
                            Email Us
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
