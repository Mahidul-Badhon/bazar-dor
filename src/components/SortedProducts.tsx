
"use client";

import { useState } from "react";
import ProductsCard from "./ProductsCard";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
};

interface Props {
  products: Product[];
};

type SortOption = "ডিফল্ট" | "কম থেকে বেশি" | "বেশি থেকে কম";

const SortedProducts = ({ products }: Props) => {
    console.log(products)
  const [sortBy, setSortBy] =
    useState<SortOption>("ডিফল্ট");

  const sortProducts = (products: Product[]) => {
    const sortedProducts = [...products];

    if (sortBy === "কম থেকে বেশি") {
      sortedProducts.sort((a, b) => a.today - b.today);
    } else if (sortBy === "বেশি থেকে কম") {
      sortedProducts.sort((a, b) => b.today - a.today);
    }

    return sortedProducts;
  };

  const afterSortedProducts = sortProducts(products);

  return (
    <div className="container mx-auto mt-2">
      {/* Sorting dropdown */}
      <div className="mt-3 flex justify-end items-center gap-3 mb-4 bg-white p-3 rounded-xl">
        <p className="text-sm font-medium text-gray-500">
          সাজান
        </p>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as SortOption)
          }
          className="cursor-pointer rounded-lg border border-gray-300 bg-white p-2 text-sm text-black outline-none"
        >

          <option value="ডিফল্ট">
            ডিফল্ট
          </option>

          <option value="কম থেকে বেশি">
            দাম: কম থেকে বেশি
          </option>

          <option value="বেশি থেকে কম">
            দাম: বেশি থেকে কম
          </option>
        </select>
      </div>

      {/* Product list */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {afterSortedProducts.map((product) => (
          <ProductsCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default SortedProducts;
