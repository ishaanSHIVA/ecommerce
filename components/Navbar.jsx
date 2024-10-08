import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from "./";

import { useStateContext } from "../context/state.context";

const Navbar = () => {
  const { showCart, setShowCart, totalquantity } = useStateContext();

  
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="https://x.com/gurujicoder">Ecommerce Clone by Ishaan Rajpal</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => {
          setShowCart(true);
        }}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalquantity}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
