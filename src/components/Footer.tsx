import React from 'react';

const Footer = () => {
  return (
    // mt-auto guarantees it anchors to the bottom even without flex-1 on main
    <footer className="mt-4 bg-white border-t border-[#dce6dd] py-6 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left text-xs sm:text-sm text-[#737c74]">
        <p className="font-medium text-[#202820]">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p>
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;