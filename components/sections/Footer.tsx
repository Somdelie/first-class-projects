import React from "react";
import Image from "next/image";
import { Paintbrush } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-400 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center space-x-3">
          <Image
            src="/FirstClass_Logo.png"
            alt="FirstClass_Logo"
            width={80}
            height={40}
          />
          <span className="text-xl font-bold text-white flex items-center ">
            {" "}
            <Paintbrush size={34} className="text-green-500" />
            Unwabu<span className="text-green-500">Painting</span>
          </span>
        </div>
        <p className="text-center">
          &copy; {new Date().getFullYear()} Unwabu Painting. All rights
          reserved.
        </p>
        <div className="flex items-center gap-3">
          {/* Social icons (replace # with actual links) */}
          <a
            href="#"
            className="w-8 h-8 bg-gray-800 hover:bg-teal-500 dark:hover:bg-teal-600 rounded flex items-center justify-center transition-colors"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37c-.83.5-1.75.87-2.72 1.07A4.28 4.28 0 0 0 12 8.5c0 .34.04.67.1.99C8.09 9.36 4.84 7.7 2.67 5.13c-.37.64-.58 1.38-.58 2.17 0 1.5.77 2.83 1.94 3.61-.72-.02-1.4-.22-1.99-.55v.06c0 2.1 1.49 3.85 3.47 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.65 0-1.29-.04-1.92-.12A12.13 12.13 0 0 0 7.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 24 4.59a8.36 8.36 0 0 1-2.54.7z" />
            </svg>
          </a>
          {/* Add more social icons as needed */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
