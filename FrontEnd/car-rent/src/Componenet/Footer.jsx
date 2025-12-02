import React from "react";
import carrentlogo from "../assets/carRentlogo.jpg";

const socialMedia = {
  instagram: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
  facebook: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
  twitter: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
  linkedin: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-wrap justify-between gap-12 md:gap-8">
        
        <div className="max-w-80">
          <img
            src={carrentlogo}
            alt="AdeCarRent Logo"
            className="mb-4 h-10 rounded-lg"
          />
          <p className="text-sm leading-relaxed">
            AdeCarRent - your trusted partner for reliable, affordable, and
            luxury car rentals. Drive comfort, style, and safety wherever you
            go.
          </p>

          <div className="flex items-center gap-4 mt-4">
            <img src={socialMedia.instagram} alt="Instagram" className="w-6 cursor-pointer hover:opacity-80" />
            <img src={socialMedia.facebook} alt="Facebook" className="w-6 cursor-pointer hover:opacity-80" />
            <img src={socialMedia.twitter} alt="Twitter" className="w-6 cursor-pointer hover:opacity-80" />
            <img src={socialMedia.linkedin} alt="LinkedIn" className="w-6 cursor-pointer hover:opacity-80" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Cars</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">FAQs</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Our Services</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><a href="#" className="hover:text-white">Luxury Car Rental</a></li>
            <li><a href="#" className="hover:text-white">Corporate Car Hire</a></li>
            <li><a href="#" className="hover:text-white">Airport Pickup & Drop</a></li>
            <li><a href="#" className="hover:text-white">Long-term Rentals</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="max-w-80">
          <h3 className="text-lg font-semibold text-white mb-3">Stay Updated</h3>
          <p className="text-sm mb-3">
            Subscribe to get exclusive deals and latest car offers.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded-l bg-white text-gray-800 w-full outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-500 px-4 rounded-r text-white font-semibold">
              Join
            </button>
          </div>
        </div>
      </div>

      <hr className="border-gray-700 mt-10" />
      <div className="flex flex-col md:flex-row items-center justify-between text-sm py-5">
        <p>© {new Date().getFullYear()} AdeCarRent. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Use</a>
          <a href="#" className="hover:text-white">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
