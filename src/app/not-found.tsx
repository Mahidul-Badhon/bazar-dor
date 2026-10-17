import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex min-h-[75vh] w-full flex-col items-center justify-center px-4 py-12 text-center">
      {/* Decorative Container */}
      <div className="w-full max-w-md rounded-3xl border border-[#dce6dd] bg-white p-8 shadow-sm sm:p-10">
        {/* Error Code Tag */}
        <div className="inline-flex items-center justify-center rounded-2xl bg-[#EFF4F2] px-4 py-1.5 text-xs font-bold text-[#185329]">
          ত্রুটি ৪০৪
        </div>

        {/* Large 404 Headline */}
        <h1 className="mt-4 text-6xl font-black tracking-tight text-[#202820] sm:text-7xl">
          ৪০৪
        </h1>

        {/* Subtitle */}
        <h2 className="mt-3 text-xl font-bold text-[#202820] sm:text-2xl">
          পাতাটি খুঁজে পাওয়া যায়নি
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm leading-relaxed text-[#737c74]">
          আপনি যে পাতাটি খুঁজছেন তা সরানো হয়েছে, নাম পরিবর্তন করা হয়েছে অথবা বর্তমানে উপলব্ধ নেই।
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-[#185329] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#134220] active:scale-[0.99]"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>

      {/* Subtle Bottom Help Link */}
      <p className="mt-6 text-xs text-[#737c74]">
        বাজার সংক্রান্ত কোনো প্রশ্ন থাকলে{" "}
        <Link href="/" className="font-semibold text-[#185329] hover:underline">
          সহায়তা কেন্দ্রে
        </Link>{" "}
        যোগাযোগ করুন।
      </p>
    </div>
  );
};

export default NotFound;