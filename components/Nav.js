import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/shopContext";
import MiniCart from "./MiniCart";

// styled navbar imported into Layout.js
export default function Nav() {
  const { cart, cartOpen, setCartOpen } = useContext(CartContext);

  let cartQuantity = 0;

  cart.map((item) => {
    return (cartQuantity += item?.variantQuantity);
  });
  return (
    <header className="border-b sticky top-0 z-20 bg-[#a7c0a7]">
      <div className="flex items-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
        <Link href="/" passHref>
          <a className="cursor-pointer">
            <h1 className="text-2xl tracking-tight ">
              <span className="inline text-secondary-color">Hygge</span>
              <span className="inline text-black"> Home Furniture</span>
            </h1>
          </a>
        </Link>{" "}
        {/* displays cart quantity */}
        <a
          className="text- font-bold cursor-pointer text-secondary-color"
          onClick={() => setCartOpen(!cartOpen)}
        >
          Cart ({cartQuantity})
        </a>
        <MiniCart cart={cart} />
      </div>
    </header>
  );
}
