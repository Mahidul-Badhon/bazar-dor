import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center px-4">
      {/* Decorative Card Container */}
      <div className="flex flex-col items-center justify-center rounded-3xl border border-[#dce6dd] bg-white px-8 py-10 shadow-sm sm:px-12">
        {/* Animated Spinner with Glow */}
        <div className="relative flex items-center justify-center">
          {/* Subtle pulse background ring */}
          <div className="absolute h-14 w-14 rounded-full bg-[#185329]/10 animate-ping" />

          {/* DaisyUI Spinner with theme green color */}
          <span className="loading loading-spinner loading-lg text-[#185329] relative z-10" />
        </div>

        {/* Loading Text */}
        <h3 className="mt-6 text-lg font-bold text-[#202820]">
          তথ্য লোড হচ্ছে...
        </h3>

        {/* Subtitle */}
        <p className="mt-1 text-xs text-[#737c74]">
          দয়া করে কিছুক্ষণ অপেক্ষা করুন
        </p>

        {/* Subtle decorative progress bar shimmer */}
        <div className="mt-6 h-1 w-32 overflow-hidden rounded-full bg-[#EFF4F2]">
          <div className="h-full w-full bg-[#185329] origin-left animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Loading;