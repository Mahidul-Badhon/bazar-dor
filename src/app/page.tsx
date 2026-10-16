import Banner from "@/components/Banner";
import Marquee from "@/components/Marquee";
import Image from "next/image";
import up from "@/assets/triangle (1).png"
import down from "@/assets/down-arrows.png"
import ProductsCard from "@/components/ProductsCard";

export default async function Home() {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products")
  const data = await res.json()
  // console.log(data)

  const topRisenProducts = data
    .filter((item) => item.change?.dir === "up")
    .sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0))
    .slice(0, 6);

    const topLowestProducts = data
    .filter((item) => item.change?.dir === "down")
    .sort((a, b) => (Math.abs(b.change?.pct) ?? 0) - (Math.abs(a.change?.pct) ?? 0))
    .slice(0, 6);
  
  return (
    <div>
      
      <Banner></Banner>
      <div>
        {/* price increased */}
        <div className="mt-8 container mx-auto">
          <div className="flex items-center gap-2">
            <span>
              <Image width={14} height={14} src={up} alt="price incresead"></Image>
            </span>
            <h2 className="font-extrabold text-2xl">আজ দাম বেড়েছে</h2>
          </div>

          {/* for card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRisenProducts.map((product) => (
              <ProductsCard key={product.id} product={product} />
            ))}
          </div>

        </div>

        {/* price decreased */}
        <div className="mt-8 container mx-auto">
          <div className="flex items-center gap-2">
            <span>
              <Image width={14} height={14} src={down} alt="price incresead"></Image>
            </span>
            <h2 className="font-extrabold text-2xl">আজ দাম কমেছে</h2>
          </div>

          {/* for card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topLowestProducts.map((product) => (
              <ProductsCard key={product.id} product={product} />
            ))}
          </div>

        </div> 

        {/* all products    */}
        <div className="mt-8 container mx-auto">
          <div className="grid items-center gap-2">
            <h2 className="font-extrabold text-2xl">সব পণ্য</h2>
            <p className="text-gray-400">মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
          </div>

          {/* for card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((product) => (
              <ProductsCard key={product.id} product={product} />
            ))}
          </div>

        </div> 

      </div>

    </div>
  );
}
