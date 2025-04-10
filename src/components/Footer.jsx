import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-white mt-6 border-t-2 border-white py-4 flex flex-col items-center justify-center">
      <p className="text-center text-sm max-w-xl px-4">
        This is a student project. All information provided is for demonstration purposes only and may not be fully accurate.
      </p>
      <p className="text-center text-sm max-w-xl px-4 mt-2 italic">
        Images used are original unless otherwise noted. All sourced images are used strictly for educational purposes with no intent to infringe copyright.
      </p>
      <div className="flex gap-4 mt-2">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="hover:text-teal-300"
        >
          <Facebook className="h-6 w-6" />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:text-teal-300"
        >
          <Instagram className="h-6 w-6" />
        </a>
      </div>
      <p className="text-xs mt-2">
        &copy; {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
