import Link from "next/link";
import banner from "@/assets/bazar-hero.png"
import Image from "next/image";
const Banner = () => {

    const date = new Date().toLocaleDateString("bn-bd",
        {
            dateStyle: "full"
        }
    )

    return (
        <div className='container bg-white mx-auto flex flex-col lg:flex-row justify-between mt-10 p-8 lg:p-12 gap-10 lg:gap-4 rounded-xl lg:px-16'>
            <div className='flex flex-col items-start justify-center gap-6 w-full lg:w-1/2'>
                <p className="p-1 bg-green-200 rounded-md text-green-600">{date}</p>
                <h2 className='font-extrabold text-3xl lg:text-4xl'>
                    আজকের বাজারের দাম এক নজরে
                </h2>
                <p>
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন<br />-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                </p>

                <Link href="#">

                    <button className='bg-green-600 flex items-center justify-center text-white rounded-md py-3 px-4 font-semibold'>
                        সব পণ্য দেখুন
                    </button>

                </Link>

            </div>
            <div className='w-full lg:w-1/2 flex justify-center lg:justify-end'>
                <Image src={banner} alt='hero-section' className="max-w-full h-auto object-contain"></Image>
            </div>
        </div>

    );
};

export default Banner;