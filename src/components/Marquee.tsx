import up from "@/assets/triangle (1).png"
import down from "@/assets/down-arrows.png"
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"
import Image from "next/image";
import Link from "next/link";

export interface ProductChange{
    dir: "up" | "down"
    pct: number
}
interface Headlines {
    id: number
    today: number
    image: string
    nameBn: string
    change: ProductChange
}
const Marquee = async () => {

    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products")
    const data:Headlines[] = await res.json()


    return (
        <div className="border border-gray-200 bg-white">
            <MarqueeText direction="right" duration={20}>
                {
                    data.map(
                        (n) => <Link href={`/product/${n.id}`} key={n.id} className="mx-4 hover:underline">
                            <span>{n.image}</span>
                            <span className="font-semibold">{" "}{n.nameBn}</span>
                            <span>{" "}{n.today} {" টাকা/কেজি"} </span>

                            {n.change?.dir === "up" && (
                                <span className="inline-flex items-center text-red-600">
                                    <Image src={up} alt="Price Up" width={14} height={14} />
                                    <span>{n.change.pct}%</span>
                                </span>
                                
                            )}
                            {n.change?.dir === "down" && (
                                <span style={{ display: "inline-flex", alignItems: "center", color: "green" }}>
                                    <Image src={down} alt="Price Down" width={14} height={14} />
                                    <span>{n.change.pct}%</span>
                                </span>
                            )}

                        {/* </span> */}
                        </Link>
                    )
                }
            </MarqueeText>
        </div>
    );
};

export default Marquee;