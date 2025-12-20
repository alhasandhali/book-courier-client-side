import React from "react";
import { Link } from "react-router";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-bg-body border-t border-card-border pt-16 pb-8 w-full mt-auto">
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={logo}
                alt="BookCourier Logo"
                className="h-8 w-8 transition-transform group-hover:rotate-12"
              />
              <span className="font-serif text-2xl text-text-main font-bold">
                Book<span className="text-accent-gold">Courier</span>
              </span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs">
              Empowering readers through a curated collection of literature, delivered with heart and efficiency.
            </p>
            <div className="flex gap-4">
              {['facebook-f', 'instagram', 'twitter', 'linkedin-in'].map(social => (
                <Link key={social} to="#" className="w-9 h-9 rounded-full bg-bg-card shadow-sm flex items-center justify-center text-text-muted hover:text-accent-gold hover:shadow-md transition-all border border-card-border">
                  <i className={`fa-brands fa-${social} text-sm`}></i>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[2px] font-bold text-text-main mb-6">
              Platform
            </h4>
            <ul className="space-y-4">
              {['New Arrivals', 'Best Sellers', 'All Books', 'Support'].map(item => (
                <li key={item}>
                  <Link to="#" className="text-sm text-text-muted hover:text-accent-gold transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-accent-gold opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[2px] font-bold text-text-main mb-6">
              Company
            </h4>
            <ul className="space-y-4">
              {['About Us', 'Privacy Policy', 'Terms of Service', 'Contact'].map(item => (
                <li key={item}>
                  <Link to="#" className="text-sm text-text-muted hover:text-accent-gold transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-accent-gold opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-bg-card p-8 rounded-3xl space-y-4 border border-card-border shadow-sm">
            <h4 className="text-xs uppercase tracking-[2px] font-bold text-text-main">
              Get in touch
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <i className="fa-solid fa-location-dot text-accent-gold mt-1 text-xs"></i>
                <p className="text-sm text-text-muted">123 Book Avenue, Literature City, LC 45678</p>
              </div>
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-envelope text-accent-gold text-xs"></i>
                <p className="text-sm text-text-muted">hello@bookcourier.com</p>
              </div>
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-phone text-accent-gold text-xs"></i>
                <p className="text-sm text-text-muted">+1 (555) 000-0000</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-card-border text-center">
          <p className="text-xs text-text-muted font-medium">
            &copy; {new Date().getFullYear()} BookCourier. Designed with <i className="fa-solid fa-heart text-red-400 mx-1"></i> for book lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
