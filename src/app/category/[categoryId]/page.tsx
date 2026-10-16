
import SortedProducts from '@/components/SortedProducts';
import Image from 'next/image';

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  today: number;
  image:string;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
};


const toBnDigit = (num: number | string): string => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    ?.toString()
    .replace(/[0-9]/g, (d) => bnDigits[parseInt(d, 10)]);
};

const CategoryProducts = async({params}:{params: {categoryId:string}}) => {
    const {categoryId} = await params
    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`)
    const data: Product[] = await res.json()
    const category = data[0]
    console.log(data)
    


    return (
        <div className='container mx-auto mt-4'>
            <div className='bg-white flex justify-start text-black p-3 rounded-xl'>
                <span className='flex justify-start items-center w-15 h-15 text-5xl'>
                    {category.image}
                        
                    </span>
                <div className='grid'>
                    <h2 className='text-2xl font-extrabold'>{category.categoryNameBn}</h2>
                    <p>{toBnDigit(data.length)} {`টি পণ্যের আজকের দাম ও পরিবর্তন`}</p>
                </div>
            </div>

            {/* sorting field */}
                <div className='flex justify-end text-black p-3 mt-4 rounded-xl'>
                    <SortedProducts products={data}></SortedProducts>
                </div>
                
            
        </div>
    );
};

export default CategoryProducts;