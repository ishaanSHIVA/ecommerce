import React from "react";

import { createContext, useContext, useState, useEffect } from "react";

import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  //  first context
  const [showCart, setShowCart] = useState(false);
  // second context
  const [cartItems, setCartItems] = useState([]);

  // third context
  const [totalprice, setTotalPrice] = useState(0);

  // fourth context
  const [totalquantity, setTotalQuantity] = useState(0);

  // fifth
  const [quantity, setQuantity] = useState(0);

  // sixth
  let foundProduct;
  let index;

  const increaseQuantity = () =>
    setQuantity((prevQuantity) => prevQuantity + 1);
  const decreaseQuantity = () =>
    setQuantity((prevQuantity) => {
      if (prevQuantity - 1 < 1) return 1;
      return prevQuantity - 1;
    });

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id == product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct.id === product.id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    setQuantity(0);
    toast.success(`${quantity} ${product.name} added to cart.`);
  };

  const onRemove = (id) => {
    foundProduct = cartItems.find((item) => item._id == id);

    const newCartItems = cartItems.filter((cartItem) => cartItem._id !== id);
    setCartItems([...newCartItems]);

    setTotalQuantity(
      (prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity
    );

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
  };

  const toggleCartItemQuantity = (id, value) => {
    console.log("called!!!");

    foundProduct = cartItems.find((item) => item._id == id);
    // foundProduct;
    index = cartItems.findIndex((item) => item._id == id);

    console.log(foundProduct.quantity);

    const newCartItems = cartItems.filter((cartItem) => cartItem._id !== id);

    if (value == "inc") {
      foundProduct.quantity++;
      setCartItems([
        ...newCartItems,
        {
          ...foundProduct,
          quantity: foundProduct.quantity,
        },
      ]);
      setTotalQuantity((prevQuantity) => prevQuantity++);
      setTotalPrice((prevPrice) => prevPrice + foundProduct.price);
    } else if (value == "dec") {
      if (foundProduct.quantity < 2) return;
      foundProduct.quantity--;
      setCartItems([
        ...newCartItems,
        {
          ...foundProduct,
          quantity: foundProduct.quantity,
        },
      ]);
      setTotalQuantity((prevQuantity) => prevQuantity--);
      setTotalPrice((prevPrice) => prevPrice - foundProduct.price);
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        setShowCart,
        totalprice,
        totalquantity,
        increaseQuantity,
        decreaseQuantity,
        quantity,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
