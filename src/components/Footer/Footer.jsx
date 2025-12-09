import React from "react";
import { Link } from "react-router";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#f3f0ea] pt-10 sm:pt-12 md:pt-[50px] pb-6 sm:pb-[30px] w-full">
      <div className="w-11/12 sm:w-10/12 mx-auto">
        <div className="footer-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2.5fr_1fr_1fr_1.2fr] gap-8 sm:gap-10 mb-8">
          <div className="footer-col">
            <Link to="/" className="flex items-center space-x-1 mb-4 sm:mb-5">
              <img
                src={logo}
                alt="BookCourier-Logo"
                className="h-7 w-7 sm:h-8 sm:w-8"
              />
              <span className="font-serif text-[1.2rem] sm:text-[1.4rem] text-accent-gold font-bold">
                BookCourier
              </span>
            </Link>
            <p className="footer-desc text-[0.85rem] sm:text-[0.9rem] text-[#666] leading-[1.7] mb-4 sm:mb-5 max-w-[320px]">
              A publications company that specializes to make famous books, and
              deliver it to customers with reasonable price.
            </p>
            <div className="socials flex gap-4 sm:gap-5">
              <i className="fa-brands fa-facebook-f text-[#333] text-[1rem] sm:text-[1.1rem] cursor-pointer hover:text-accent-gold transition-colors"></i>
              <i className="fa-brands fa-instagram text-[#333] text-[1rem] sm:text-[1.1rem] cursor-pointer hover:text-accent-gold transition-colors"></i>
              <i className="fa-brands fa-twitter text-[#333] text-[1rem] sm:text-[1.1rem] cursor-pointer hover:text-accent-gold transition-colors"></i>
              <i className="fa-brands fa-linkedin-in text-[#333] text-[1rem] sm:text-[1.1rem] cursor-pointer hover:text-accent-gold transition-colors"></i>
            </div>
          </div>
          <div className="footer-col">
            <h4 className="text-[0.75rem] sm:text-[0.8rem] uppercase tracking-[1px] mb-4 sm:mb-6 text-[#333] font-bold">
              Menu
            </h4>
            <ul className="flex flex-col gap-3 sm:gap-4">
              <li>
                <Link
                  to="#"
                  className="text-[0.85rem] sm:text-[0.9rem] text-[#666] hover:text-accent-gold transition-colors"
                >
                  Online support
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-[0.85rem] sm:text-[0.9rem] text-[#666] hover:text-accent-gold transition-colors"
                >
                  Our services
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-[0.85rem] sm:text-[0.9rem] text-[#666] hover:text-accent-gold transition-colors"
                >
                  Order return
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-[0.85rem] sm:text-[0.9rem] text-[#666] hover:text-accent-gold transition-colors"
                >
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="text-[0.75rem] sm:text-[0.8rem] uppercase tracking-[1px] mb-4 sm:mb-6 text-[#333] font-bold">
              Security
            </h4>
            <ul className="flex flex-col gap-3 sm:gap-4">
              <li>
                <Link
                  to="#"
                  className="text-[0.85rem] sm:text-[0.9rem] text-[#666] hover:text-accent-gold transition-colors"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-[0.85rem] sm:text-[0.9rem] text-[#666] hover:text-accent-gold transition-colors"
                >
                  Terms & conditions
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-[0.85rem] sm:text-[0.9rem] text-[#666] hover:text-accent-gold transition-colors"
                >
                  Delivery Information
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="text-[0.75rem] sm:text-[0.8rem] uppercase tracking-[1px] mb-4 sm:mb-6 text-[#333] font-bold">
              Get in touch
            </h4>
            <ul className="flex flex-col gap-3 sm:gap-4 text-[0.85rem] sm:text-[0.9rem] text-[#666] list-none">
              <li>Address: Celina, Delaware 10299</li>
              <li>Email: paperhaven@gmail.com</li>
              <li>Phone: (671) 555-0110</li>
            </ul>
          </div>
        </div>
        <div className="copyright text-center text-[0.75rem] sm:text-[0.8rem] text-[#999] border-t border-[#e5e2dc] pt-4 sm:pt-6">
          Copyright @ 2025 BookCourier All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
