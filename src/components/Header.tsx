import logo from "@/assets/logo-icon.png"
import Image from "next/image";
import NavLinks from "./NavLinks";
const Header = () => {

    const date = new Date().toLocaleDateString("bn-bd",
        {
            dateStyle: "full"
        }
    )

    return (
        <div>
        <div className="flex justify-between mt-2 py-3 container mx-auto">
            <div className="flex gap-2">
                <div className="bg-green-500 rounded-md">
                    <Image className="w-10 h-10" height={30} width={30} src={logo} alt="Logo Image"></Image>

                </div>
                <div>
                    <h2 className="font-bold">বাজার দর</h2>
                    <p>{date}</p>
                </div>
            </div>

            <div>
                <button className="btn border-0">সাইন ইন</button>
                <button className="btn btn-success mx-1.5 text-white">সাইন আপ</button>
            </div>
            </div>
        <NavLinks></NavLinks>
        </div>
        
    );
};

export default Header;