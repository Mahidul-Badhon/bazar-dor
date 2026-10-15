import Banner from "@/components/Banner";
import Marquee from "@/components/Marquee";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Marquee></Marquee>
      <Banner></Banner>
      <p>THis is home</p>
      
    </div>
  );
}
