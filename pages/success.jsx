import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useRouter } from "next/router";

import { useStateContext } from "../context/state.context";
import { runFireworks } from "../lib/utils";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantity } = useStateContext();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantity(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <runFireworks></runFireworks>
      <div className="success">
        <p className="icon">
          <BsBagCheckFill></BsBagCheckFill>
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions,please don't email as this is just for
          testing purposes.
          <a href="mailto:no@yo.com " className="email"></a>
        </p>
        <Link href="/">
          <button width="300px" type="button" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
