
import upIcon from "@/assets/triangle (1).png";
import down from "@/assets/down-arrows.png";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

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
  markets: Market[];
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
    notFound()
  }

  const data: Product = await res.json();

  if(!data){
    notFound()
  }

  const priceDifference = data.today - data.yesterday;
  const priceWentUp = data.change.dir === "up";

  // Calculate price summary from market data
  const lowestPrice = Math.min(...data.markets.map((market) => market.min));
  const highestPrice = Math.max(...data.markets.map((market) => market.max));

  const averagePrice =
    data.markets.length > 0
      ? data.markets.reduce(
        (total, market) => total + (market.min + market.max) / 2,
        0
      ) / data.markets.length
      : 0;

  return (
    <div className="container mx-auto mt-6 px-4 pb-8">
      {/* Product header */}
      <div className="flex flex-col items-center justify-between gap-5 rounded-[28px] border border-[#dce6dd] bg-[#f9fcf9] p-5 text-[#202820] sm:flex-row sm:p-8">
        {/* Product details */}
        <div className="flex w-full items-center gap-5 sm:gap-7">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-[#f0f5f0] text-4xl sm:h-[100px] sm:w-[100px] sm:text-5xl">
            {data.image}
          </div>

          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              {data.nameBn}
            </h2>

            <p className="mt-2 text-base text-[#737c74] sm:text-lg">
              {formatUnit(data.unit)} · {data.categoryNameBn}
            </p>

            <p className="mt-3 text-sm sm:text-lg">
              গতকালের তুলনায় আজ দাম{" "}
              <span className="font-bold">
                {priceWentUp ? "বেড়েছে" : "কমেছে"}
              </span>
              {" · "}
              {toBnDigit(Math.abs(priceDifference))} টাকা
            </p>
          </div>
        </div>

        {/* Today's price */}
        <div className="flex w-full shrink-0 flex-col items-center justify-center rounded-3xl bg-[#f0f5f0] px-5 py-4 sm:w-47.5">
          <p className="text-lg text-[#737c74]">আজকের দাম</p>

          <h3 className="mt-1 text-4xl font-extrabold">
            {toBnDigit(data.today)}
          </h3>

          <p className="mt-1 text-base text-[#737c74]">
            টাকা / {data.unit === "kg" ? "কেজি" : data.unit}
          </p>

          <p
            className={`mt-2 flex items-center gap-1 text-lg font-bold ${priceWentUp ? "text-red-500" : "text-green-600"
              }`}
          >
            <Image
              src={priceWentUp ? upIcon : down}
              alt={priceWentUp ? "Price increased" : "Price decreased"}
              width={16}
              height={16}
            />
            {toBnDigit(data.change.pct)}%
          </p>
        </div>
      </div>

      {/* Price summary section */}
      <section className="mt-6 rounded-3xl border border-[#dce6dd] bg-[#f9fcf9] p-4 sm:p-6">
        <h2 className="mb-5 text-xl font-extrabold text-[#202820]">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Minimum price */}
          <div className="rounded-[20px] border border-[#dce6dd] p-5">
            <p className="text-base text-[#737c74]">সর্বনিম্ন দাম</p>
            <p className="mt-1 text-3xl font-extrabold text-green-600">
              {toBnDigit(lowestPrice)}{" "}
              <span className="text-base font-normal">টাকা</span>
            </p>
            <p className="mt-1 text-sm text-[#737c74]">
              সবচেয়ে কম দামের বাজার
            </p>
          </div>

          {/* Maximum price */}
          <div className="rounded-[20px] border border-[#dce6dd] p-5">
            <p className="text-base text-[#737c74]">সর্বাধিক দাম</p>
            <p className="mt-1 text-3xl font-extrabold text-red-500">
              {toBnDigit(highestPrice)}{" "}
              <span className="text-base font-normal">টাকা</span>
            </p>
            <p className="mt-1 text-sm text-[#737c74]">
              সবচেয়ে বেশি দামের বাজার
            </p>
          </div>

          {/* Average price */}
          <div className="rounded-[20px] border border-[#dce6dd] p-5">
            <p className="text-base text-[#737c74]">গড় দাম</p>
            <p className="mt-1 text-3xl font-extrabold text-green-600">
              {toBnDigit(Math.round(averagePrice))}{" "}
              <span className="text-base font-normal">টাকা</span>
            </p>
            <p className="mt-1 text-sm text-[#737c74]">
              প্রতি {data.unit === "kg" ? "কেজি" : data.unit}-এর হিসাবে
            </p>
          </div>
        </div>

        {/* Market prices table */}
        <h2 className="mb-5 mt-8 text-xl font-extrabold text-[#202820]">
          বাজারভিত্তিক আজকের দাম
        </h2>

        {/* table for market data */}
        <div>
          {/*
          for mobileview */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {data.markets.map((market, index) => {
              const marketAverage = (market.min + market.max) / 2;

              return (
                <div
                  key={index}
                  className="rounded-2xl border border-[#dce6dd] bg-white p-4 shadow-sm"
                >
                  {/* Header: Market Name & Division */}
                  <div className="flex items-start justify-between border-b border-[#edf3ed] pb-2.5">
                    <div>
                      <h4 className="font-bold text-[#202820] text-base">
                        {market.market}
                      </h4>
                      <p className="text-xs text-[#737c74] mt-0.5">
                        {market.division} বিভাগ
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-medium text-[#737c74] block">
                        গড় দাম
                      </span>
                      <span className="font-bold text-sm text-[#185329]">
                        {toBnDigit(marketAverage.toFixed(2))} টাকা
                      </span>
                    </div>
                  </div>

                  {/* Price Range Details */}
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-xl bg-[#f9fcf9] p-2.5 border border-[#edf3ed]">
                      <span className="text-[#737c74] block mb-0.5">সর্বনিম্ন</span>
                      <span className="font-semibold text-[#202820]">
                        {toBnDigit(market.min)} টাকা
                      </span>
                    </div>
                    <div className="rounded-xl bg-[#f9fcf9] p-2.5 border border-[#edf3ed]">
                      <span className="text-[#737c74] block mb-0.5">সর্বাধিক</span>
                      <span className="font-semibold text-[#202820]">
                        {toBnDigit(market.max)} টাকা
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/*
          for tablet latptop
        */}
          <div className="hidden md:block overflow-x-auto rounded-[20px] border border-[#dce6dd] bg-white shadow-sm">
            <table className="w-full border-collapse text-left text-sm lg:text-base">
              <thead className="bg-[#f9fcf9] text-[#737c74] border-b border-[#dce6dd]">
                <tr>
                  <th className="px-4 py-3.5 lg:px-6 lg:py-4 font-bold">বাজার</th>
                  <th className="px-4 py-3.5 lg:px-6 lg:py-4 font-bold">বিভাগ</th>
                  <th className="px-4 py-3.5 lg:px-6 lg:py-4 text-right font-bold">সর্বনিম্ন</th>
                  <th className="px-4 py-3.5 lg:px-6 lg:py-4 text-right font-bold">সর্বাধিক</th>
                  <th className="px-4 py-3.5 lg:px-6 lg:py-4 text-right font-bold">গড়</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#dce6dd]">
                {data.markets.map((market, index) => {
                  const marketAverage = (market.min + market.max) / 2;

                  return (
                    <tr
                      key={index}
                      className={`transition-colors hover:bg-[#eaf1eb]/50 ${index % 2 === 1 ? "bg-[#f4f8f4]" : "bg-white"
                        }`}
                    >
                      <td className="px-4 py-3.5 lg:px-6 lg:py-4 font-medium text-[#202820] whitespace-nowrap">
                        {market.market}
                      </td>

                      <td className="px-4 py-3.5 lg:px-6 lg:py-4 text-[#4b554c] whitespace-nowrap">
                        {market.division}
                      </td>

                      <td className="px-4 py-3.5 lg:px-6 lg:py-4 text-right text-[#202820] whitespace-nowrap">
                        {toBnDigit(market.min)} টাকা
                      </td>

                      <td className="px-4 py-3.5 lg:px-6 lg:py-4 text-right text-[#202820] whitespace-nowrap">
                        {toBnDigit(market.max)} টাকা
                      </td>

                      <td className="px-4 py-3.5 lg:px-6 lg:py-4 text-right font-bold text-[#185329] whitespace-nowrap">
                        {toBnDigit(marketAverage.toFixed(2))} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Productpage;