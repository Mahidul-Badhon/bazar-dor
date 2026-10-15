import Link from "next/link";
interface IngredientCategory {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {

    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories")
    const data:IngredientCategory[] = await res.json()
    console.log(data)
    return (
        <div className="flex max-w-6xl mx-auto gap-6 my-3">
            {
                data.map(
                    (n) => <Link key={n.id} href={n.slug}>
                        <span className="mx-1.5">{n.icon}</span>
                        {n.nameBn}
                    </Link>)

            }
        </div>
    );
};

export default NavLinks;