import React from "react";
import Image from "next/image";
import upIcon from "@/assets/triangle (1).png";
import down from "@/assets/down-arrows.png"
import Link from "next/link";

const toBnDigit = (num: string) => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    ?.toString()
    .replace(/[0-9]/g, (d) => bnDigits[parseInt(d, 10)]);
};

const ProductsCard = ({ product }) => {
  // Unit formatting helper for Bengali text
  const formatUnit = (unit) => {
    if (unit === "kg") return "প্রতি কেজি";
    if (unit === "dozen") return "প্রতি ডজন";
    if (unit === "piece" || unit === "pcs") return "প্রতি পিস";
    return `প্রতি ${unit}`;
  };
  // console.log(product.id)
  return (
    <Link href={`/product/${product.id}`}>
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
      {/* Top: Icon + Title & Unit */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-[#F4F7F5] flex items-center justify-center text-2xl flex-shrink-0">
          {product.image}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-lg leading-tight">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {formatUnit(product.unit)}
          </p>
        </div>
      </div>

      {/* Bottom: Price + Percentage Change */}
      <div className="mt-6 flex items-end justify-between">
        <div>
          <span className="block text-xs text-gray-500 font-medium mb-1">
            আজকের দাম
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-gray-900 tracking-tight">
              {toBnDigit(product.today)}
            </span>
            <span className="text-sm font-semibold text-gray-700">টাকা</span>
          </div>
        </div>

        {/* Change Indicator Badge */}
        {product?.change && (
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${product.change.dir === "up"
                ? "bg-red-100 text-red-600"
                : product.change.dir === "down"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-600"
              }`}
          >
            <Image
              src={
                product.change.dir === "up"
                  ? upIcon
                  : down
              }
              alt={
                product.change.dir === "up"
                  ? "Price increased"
                  : "Price decreased"
              }
              width={12}
              height={12}
              className="object-contain"
            />
            
            <span>{toBnDigit(`${Math.abs(product.change.pct)}`)}%</span>
          </div>
        )}
      </div>
    </div>
    </Link>
    
  );
};

export default ProductsCard;