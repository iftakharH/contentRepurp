import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 border-t border-white/5 text-center text-dark-400 text-xs sm:text-sm w-full shrink-0 relative bg-dark-900/50 backdrop-blur-sm">
      <p>
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-primary-400">contentRepurp</span>.
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
