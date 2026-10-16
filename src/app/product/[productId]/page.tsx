import React from 'react';
import upIcon from "@/assets/triangle (1).png";
import down from "@/assets/down-arrows.png"
import Image from 'next/image';

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  image: string;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

const toBnDigit = (num: number | string): string => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  return num.toString().replace(/[0-9]/g, (d) =>
    bnDigits[parseInt(d, 10)]
  );
};

const formatUnit = (unit: string): string => {
  if (unit === "kg") return "প্রতি কেজি";
  if (unit === "dozen") return "প্রতি ডজন";
  if (unit === "piece" || unit === "pcs") return "প্রতি পিস";

  return `প্রতি ${unit}`;
};

const Productpage = async ({ params }: ProductPageProps) => {
  const { productId } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${productId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const data: Product = await res.json();

  const priceDifference = data.today - data.yesterday;
  const priceWentUp = data.change.dir === "up";

  return (
    <div className="container mx-auto mt-6 px-2">
      <div className="flex flex-col items-center justify-between gap-3 rounded-[28px] border border-[#dce6dd] bg-[#f9fcf9] p-3 text-[#202820] sm:flex-row sm:p-8 lg:px-4 lg:py-4">
        {/* Left: Product icon and details */}
        <div className="flex items-center gap-5 sm:gap-7">
          <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-[#f0f5f0] text-2xl sm:h-[90px] sm:w-[90px]">
            {data.categoryIcon}
          </div>

          <div>
            <h2 className="text-2xl font-extrabold sm:text-2xl lg:text-2xl">
              {data.nameBn}
            </h2>

            <p className="mt-2 text-base text-[#737c74] sm:text-xl">
              {formatUnit(data.unit)} · {data.categoryNameBn}
            </p>

            <p className="mt-4 text-base sm:text-xl">
              গতকালের তুলনায় আজ দাম{" "}
              <span className="font-bold">
                {priceWentUp ? "বেড়েছে" : "কমেছে"}
              </span>
              {" · "}
              {toBnDigit(Math.abs(priceDifference))} টাকা
            </p>
          </div>
        </div>

        {/* Right: Today's price */}
        <div className="flex flex-col items-center justify-center rounded-[28px] bg-[#f0f5f0] px-1 py-2 sm:w-[208px] sm:py-3">
          <p className="text-lg text-[#737c74] sm:text-xl">
            আজকের দাম
          </p>

          <h3 className="mt-1 text-3xl font-extrabold sm:text-3xl">
            {toBnDigit(data.today)}
          </h3>

          <p className="mt-1 text-base text-[#737c74] sm:text-xl">
            টাকা / {data.unit === "kg" ? "কেজি" : data.unit}
          </p>

          <p
            className={`mt-3 text-lg font-bold ${
              priceWentUp ? "text-red-500" : "text-green-600"
            }`}>
            {priceWentUp ? <Image src={upIcon} alt='up'></Image> : <Image src={down} alt='down'></Image>} {toBnDigit(data.change.pct)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Productpage;
